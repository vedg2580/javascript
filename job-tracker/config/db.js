const mongoose = require('mongoose');
const config = require('./config');
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected");
    } catch(error){
        console.error(error);
        throw error;
    }
};

module.exports = connectDB;