const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/crud_ejs");
        console.log(`MongoDB database is connected`);
    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
};

module.exports = { connectDB }