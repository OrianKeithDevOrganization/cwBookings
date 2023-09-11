const User = require('../models/UserModel')
import errorHandler from "../helpers/dbErrorHandler.";

const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const create = async (req,res) => {

    const {name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        })
    
        res.json(user);
    } catch(err) {
        res.status(422).json({
            error: errorHandler.getErrorMessage(err)
        })

    }

} 

module.exports = { create }