const bookingCtrl = require('../controllers/bookings.data.controller')
const express = require('express');
const router = express.Router();


router.post("/booking",bookingCtrl.bookAPlace)


module.exports = router;
