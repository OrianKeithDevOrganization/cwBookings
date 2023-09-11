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
                res.cookie('token',token).json('pass ok')
            });

        } else {
            res.status(422).json('pass wrong');
        }
    } else {
        res.json('not found');
    }

} 



module.exports = { login }
// export default { login };