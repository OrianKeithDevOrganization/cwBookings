
const Booking = require('../models/Bookings');


const bookAPlace = (req,res) => {
    const {
        place,checkIn,checkOut,numberOfGuests, name, mobile, price,
    } = req.body;

    Booking.create({
        place,checkIn,checkOut,numberOfGuests, name, mobile, price,
    }).then((err,doc) => {
        if (err) throw err;

        res.json(doc);
    });

}


module.exports = { bookAPlace }
