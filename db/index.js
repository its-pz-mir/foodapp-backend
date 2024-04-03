const mongoose = require("mongoose")
require("dotenv").config();

const dbUri = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        mongoose.connect(dbUri)
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;