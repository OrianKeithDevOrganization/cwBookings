import userCtrl from '../controllers/user.controller';

const express = require('express');
const router = express.Router();

router.post("/register",userCtrl.create);

module.exports = router;

 