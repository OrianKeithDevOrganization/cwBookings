const config = require("../config/config");
const download = require('image-downloader');
const fs = require('fs');
const Place = require('../models/Places');
const jwt = require('jsonwebtoken');


const uploadByLink = async (req,res) => {

    const {link} = req.body; 
    const newName = 'photo' + Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: config.path + 'api/uploads/' + newName,
    });

    res.json(newName);
}



const upload = (req, res) => {
    let uploadedFiles = [];

    for (let i=0; i<req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts= originalname.split('.');
        const extension = parts[parts.length -1];
        const newPath = path + '.' + extension;

        fs.renameSync(path, newPath);

        uploadedFiles.push(newPath.replace('uploads/',''))
    }
    res.json(uploadedFiles); 
}


const storeData = (req, res) => {

    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body;
    

    jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
        
        if (err) throw err;

        const placeDoc = await Place.create({
            owner:userData.id,
            title,
            address, 
            photos:addedPhotos, 
            description, 
            perks, 
            extraInfo, 
            checkIn,
            checkOut, 
            maxGuests,
        })

    })

    

}


const userPlacesView = async (req, res) => {
    const {token} = req.cookies;

    jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Place.find({owner:id}) );
    })


}

const placesById = async (req, res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));


};


const updateExistingPlace = async(req,res) => {
    const {token} = req.cookies;
    const {
        id, title, address, addedPhotos, description, 
        perks, extraInfo, checkIn, checkOut, maxGuests
    } = req.body;
    


    jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
    
        if (err) throw err;

        const placeDoc = await Place.findById(id); //Fetch place doc after verification

        if (userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,
                address, 
                photos:addedPhotos, 
                description, 
                perks, 
                extraInfo, 
                checkIn,
                checkOut, 
                maxGuests,
            })
            await placeDoc.save()
            res.json('ok')
        }
    })



}

module.exports = { upload, uploadByLink , storeData, placesView , placesById, updateExistingPlace }
