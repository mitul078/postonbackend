const mongoose = require("mongoose")

const packageSchema = mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentStatus: {
        type: String,
        enum: ['pending', 'assigned', 'in-transit', 'delivered'],
        default: 'pending'
    },

    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
        , quantity: Number
    }
    ],
    subtotal: { type: Number },
    cartTotal: { type: Number },
    tax: { type: Number },

    assignedAgentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    expectedDelivery: {
        type: Date,
        default: null
    },
    customerContact: {
        type: Number,
        required: true
    },
    customerPinCode: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    deliveredAt: {
        type:Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Package", packageSchema)