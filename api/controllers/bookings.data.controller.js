const config = require("../config/config");
const jwt = require('jsonwebtoken');
const Booking = require('../models/Bookings');



//function to return user data,
//using Promise to return the user data from jwt function
//passing in request, then verifying token in request with 
// signature
function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {

        jwt.verify(req.cookies.token, config.jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })

    })
}



const bookAPlace = async(req,res) => {
    const userData = await getUserDataFromRequest(req);


    const {
        place,checkIn,checkOut,numberOfGuests, name, mobile, price
    } = req.body;

    Booking.create({
        place,checkIn,checkOut,numberOfGuests, name, mobile, price,user:userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });

} 



const privateBookings = async(req,res) => {
    //grabbing our user data
    //sync it returns a promise use await&async
    const userData = await getUserDataFromRequest(req);

    //get userId
    res.json(await Booking.find({user:userData.id}));

}


module.exports = { bookAPlace, privateBookings }
