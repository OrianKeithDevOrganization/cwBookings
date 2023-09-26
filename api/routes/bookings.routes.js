const bookingCtrl = require('../controllers/bookings.data.controller')
const express = require('express');
const router = express.Router();


router.post("/bookings",bookingCtrl.bookAPlace)


module.exports = router;
