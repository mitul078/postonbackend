const mongoose = require("mongoose")

const packageSchema = mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    currentStatus: {
        type: String,
        enum: ['pending', 'assigned', 'in-transit', 'delivered'],
        default: 'pending'
    },

    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
        , quantity: Number
    }
    ],

    productImage: [String],

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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Package", packageSchema)