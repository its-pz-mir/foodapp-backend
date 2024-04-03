const mongoose = require("mongoose");

const Products = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model("Products", Products);