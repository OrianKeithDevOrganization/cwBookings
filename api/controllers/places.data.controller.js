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



const upload = async (req, res) => {
    const uploadedFiles = [];

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
        addedPhotos, 
        description, 
        perks, 
        extraInfo, 
        checkIn,
        checkOut, 
        maxGuests,
    })

    })

    

}




module.exports = { upload, uploadByLink , storeData}
