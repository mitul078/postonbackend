
const Package = require("../models/Package")

exports.placeOrder = async (req, res) => {
    const { origin, destination } = req.body
    const customerID = req.user.id

    try {
        const order = await Package.create({
            customerID, origin, destination
        })

        res.status(200).json({
            message: "Order Placed Successfully",
            order: order
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Placed"
        })
    }
}
exports.getOrder = async (req, res) => {
    try {
        const customerId = req.user.id
        const orders = await Package.find({ customerID: customerId }).sort({ createdAt: -1 })

        res.status(200).json({
            message: "Fetched Successfully",
            orders
        })

    } catch (error) {
        res.status(500), json({
            message: "failed to fetch orders"
        })
    }
}