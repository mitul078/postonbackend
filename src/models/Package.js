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
    assignedAgentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    expectedDelivery: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Package", packageSchema)