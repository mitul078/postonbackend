
const Package = require("../models/Package")
const checkoutSession = require("../models/checkoutSession");

exports.placeOrder = async (req, res) => {
    const customerID = req.user.id;
    const { customerName, customerAddress, customerContact, customerPinCode , customerEmail  } = req.body;


    try {
        const session = await checkoutSession.findOne({ customerID })

        if (!session) return res.status(400).json({ message: "Session Is Expired" })

        if ( !customerContact || !customerPinCode || !customerName || !customerAddress || !customerEmail) {
            return res.status(400).json({ message: "All delivery fields are required" });
        }

        const items = session.productWithQuantity.map(p => ({
            productId: p.productId,
            quantity: p.quantity
        }));

        const order = await Package.create({
            customerID,
            customerName,
            customerAddress,
            customerContact,
            customerPinCode,
            customerEmail,
            items,
            subtotal: session.subtotal,
            cartTotal: session.cartTotal,
            tax: session.tax
        });

        await checkoutSession.deleteOne({ customerID });

        res.status(200).json({
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({
            message: "Failed to Place Order",
            error: error.message
        });
    }
};
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