
import authCtrl from '../controllers/auth.controller';

const express = require('express');
const router = express.Router();


router.post("/login",authCtrl.login);


export default router;