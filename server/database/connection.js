const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const urlDB = process.env.MONGO_ACCESS_CONNECTION;

        await mongoose.connect(urlDB);
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = connectDB;