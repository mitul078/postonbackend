const Cart = require("../models/Cart");
const checkoutSession = require("../models/checkoutSession");


exports.addToCart = async (req, res) => {
    const customerID = req.user.id;

    const { productID, quantity } = req.body

    try {
        let cart = await Cart.findOne({ customerID })
        if (!cart) {
            cart = await Cart.create({
                customerID, items: [{
                    productId: productID, quantity
                }]
            })
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productID)

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId: productID, quantity });
            }

            await cart.save()
        }
        res.status(200).json({
            message: "Product added to cart",
            cart,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }

}

exports.checkout = async (req, res) => {
    const customerID = req.user.id

    const {  subtotal, productWithQuantity, tax, cartTotal } = req.body
    if ( !productWithQuantity || !subtotal || !cartTotal) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        await checkoutSession.deleteMany({ customerID });

        const session = new checkoutSession({
            customerID,
            productWithQuantity,
            subtotal,
            tax,
            cartTotal
        });

        await session.save();

        res.status(200).json({
            message: "Session Created"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

exports.getCheckoutDetail = async (req, res) => {
    const customerID = req.user.id

    try {
        const products = await checkoutSession.findOne({ customerID })
        if(!products) {
            return res.status(400).json({
                message: "No session found"
            })
        }
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.seeCart = async (req, res) => {
    const customerID = req.user.id
    try {
        const cart = await Cart.findOne({ customerID }).populate("items.productId")
        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            cart,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.remove = async (req, res) => {
    const customerID = req.user.id
    const pid = req.params.pid
    try {
        const cart = await Cart.findOne({ customerID })
        if (!cart) return res.status(400).json({ message: "Cart not found" })

        cart.items = cart.items.filter(item => item.productId.toString() !== pid)
        await cart.save()
        res.status(200).json({ message: "Item removed successfully", cart });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}
