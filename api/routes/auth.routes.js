
const authCtrl = require('../controllers/auth.controller')

const express = require('express');
const router = express.Router();


router.post("/login",authCtrl.login);
router.get("/profile", authCtrl.profile);


module.exports = router;