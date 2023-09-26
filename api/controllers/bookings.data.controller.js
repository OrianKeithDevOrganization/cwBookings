
const Booking = require('../models/Bookings');


const bookAPlace = (req,res) => {
    const {
        place,checkIn,checkOut,numberOfGuests, name, mobile, price,
    } = req.body;

    Booking.create({
        place,checkIn,checkOut,numberOfGuests, name, mobile, price,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });

}


module.exports = { bookAPlace }
