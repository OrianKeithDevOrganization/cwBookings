import config from "./config/config";
import app from "./express";

const mongoose = require('mongoose');



// setting up Database connection

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to the database: ${config.mongoUri}`)
}); 


app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s .',config.port)
});