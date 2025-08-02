// models/CheckoutSession.js
const mongoose = require("mongoose");

const checkoutSessionSchema = new mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productWithQuantity: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ],
    subtotal: Number,
    tax: Number,
    cartTotal:Number,
    createdAt: { type: Date, default: Date.now, expires: 1800 } // expires after 30 min
});

module.exports = mongoose.model("CheckoutSession", checkoutSessionSchema);
