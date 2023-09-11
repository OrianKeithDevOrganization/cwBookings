require('dotenv').config()


const config = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "OUR_SECRET_KEY",
    mongoUri: process.env.MONGODB_URL || 
        process.env.MONGO_HOST || 
        'mongodb://'+(process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') + 
        '/bookingsDB'
}


export default config;