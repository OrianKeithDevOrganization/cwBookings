const config = require("../config/config");
const download = require('image-downloader');
const fs = require('fs');

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

module.exports = { upload, uploadByLink }
