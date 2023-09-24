const propertyCtrl = require('../controllers/places.data.controller')
const multer = require('multer');
const express = require('express');
const router = express.Router();

const photosMiddleware = multer({dest:'uploads/'})


router.post("/upload-by-link",propertyCtrl.uploadByLink);
router.post("/upload",photosMiddleware.array('photos', 100),propertyCtrl.upload)
router.post("/places",propertyCtrl.storeData)
router.get("/places",propertyCtrl.placesView)
router.get("/places/:id", propertyCtrl.placesById)


module.exports = router;