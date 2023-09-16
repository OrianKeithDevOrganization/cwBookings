const propertyCtrl = require('../controllers/places.data.controller')
const multer = require('multer');
const express = require('express');
const router = express.Router();

const photosMiddleware = multer({dest:'uploads/'})


router.post("/upload-by-link",propertyCtrl.uploadByLink);
router.post("/upload",photosMiddleware.array('photos', 100),propertyCtrl.upload)


module.exports = router;