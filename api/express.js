const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const express = require('express');
const cors = require('cors')


const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
})) 

app.use('/', userRoutes)
app.use('/', authRoutes)



app.get('/test', (req,res) => {
    res.json('test ok');
}) 


module.exports = app 