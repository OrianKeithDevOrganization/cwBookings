const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const placeRoutes = require('./routes/places.routes');
const bookingRoutes = require('./routes/bookings.routes');

const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
})) 

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', placeRoutes)
app.use('/', bookingRoutes)
app.use('/uploads', express.static(__dirname+'/uploads'));



app.get('/test', (req,res) => {
    res.json('test ok');
}) 


module.exports = app 