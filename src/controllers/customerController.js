
const Package = require("../models/Package")
const imagekit = require("../lib/imagekit")

exports.placeOrder = async (req, res) => {
    const { origin, destination, productName , customerContact , customerPinCode } = req.body
    const customerID = req.user.id
    const file = req.file

    try {
        let imageUrl = null;
        if (file) {
            const uploadResponse = await imagekit.upload({
                file: file.buffer,
                fileName: `${Date.now()}_${file.originalname}`,
                folder: "PostOn-proofs",
            });
            imageUrl = uploadResponse.url;
        }

        const order = await Package.create({
            customerID, origin, destination, productName, productImage: imageUrl , customerContact , customerPinCode
        })

        if (!origin || !destination || !productName , !customerContact , !customerPinCode) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        res.status(200).json({
            message: "Order Placed Successfully",
            order: order
        })

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({
            message: "Failed to Place Order",
            error: error.message
        });
    }
}
exports.getOrder = async (req, res) => {
    try {
        const customerId = req.user.id
        const orders = await Package.find({ customerID: customerId }).sort({ createdAt: -1 }).populate("assignedAgentInfo", "username email")
        res.status(200).json({
            message: "Fetched Successfully",
            orders
        })

    } catch (error) {
        res.status(500).json({
            message: "failed to fetch orders"
        })
    }
}