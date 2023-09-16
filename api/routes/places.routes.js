const propertyCtrl = require('../controllers/places.data.controller')

const express = require('express');
const router = express.Router();


router.post("/upload-by-link",propertyCtrl.upload);


module.exports = router;