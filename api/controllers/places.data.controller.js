const config = require("../config/config");
const download = require('image-downloader');


const upload = async (req,res) => {

    const {link} = req.body; 
    const newName = 'photo' + Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: config.path + 'api/uploads/' + newName,
    });

    res.json(newName);
}



module.exports = { upload }
