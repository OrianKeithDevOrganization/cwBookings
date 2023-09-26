const bookingCtrl = require('../controllers/bookings.data.controller')
const express = require('express');
const router = express.Router();


router.post("/bookings",bookingCtrl.bookAPlace);
router.get("/booking",bookingCtrl.privateBookings);


module.exports = router;
