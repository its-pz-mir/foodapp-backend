const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            qty: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Cart", Cart);