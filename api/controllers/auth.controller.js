//Todo: Handle sigin/login requests
//Todo: Handle sign-out requests


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config")


const login = async(req,res) => {

    const {email,password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        const passOk = bcrypt.compareSync(password,user.password)
        if (passOk) {

            jwt.sign({email:user.email,id:user._id},config.jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token',token).json(user) //returning user document here
            });

        } else {
            res.status(422).json('pass wrong');
        }
    } else {
        res.json('not found');
    }

} 



const profile = (req,res) => {
    const {token} = req.cookies;

    //check if we have token

    if (token) {
        // let's try to decrypt the token with signature
        // arrow function is a callback with parameter error and result 
        jwt.verify(token, config.jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
                //grab id from cookies
                const {name,email,_id} = await User.findById(userData.id) 

            res.json({name,email,_id});
        })

    } else {
        res.json(null);
    }

}


module.exports = { login , profile }