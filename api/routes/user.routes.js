const userCtrl = require('../controllers/user.controller')
const express = require('express');
const router = express.Router();

router.post("/register",userCtrl.create);
router.post("/logout",userCtrl.logout )

module.exports = router;

 