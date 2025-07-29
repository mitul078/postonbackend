
const Package = require("../models/Package")
const Cart = require("../models/Cart")

exports.placeOrder = async (req, res) => {
    const customerID = req.user.id
    const { origin, destination, customerContact, customerPinCode, selectedItems } = req.body
    try {
        const cart = await Cart.findOne({ customerID })
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        if (!selectedItems || selectedItems.length === 0) {
            return res.status(400).json({ message: "No items selected." });
        }

        if (!origin || !destination || !customerContact || !customerPinCode) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const order = await Package.create({
            customerID, origin, destination, customerContact, customerPinCode, products: selectedItems
        })

        if (cart) {
            cart.items = cart.items.filter(
                (item) =>
                    !selectedItems.find((sel) => sel.product === item.product.toString())
            );
            await cart.save();
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