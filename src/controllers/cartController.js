const Cart = require("../models/Cart")

exports.addToCart = async (req, res) => {
    const customerID = req.user.id;

    const { productID, quantity } = req.body

    try {
        let cart = await Cart.findOne({ customerID })
        if (!cart) {
            cart = await Cart.create({
                customerID, items: [{
                    product: productID, quantity
                }]
            })
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productID)

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productID, quantity });
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

exports.seeCart = async (req, res) => {
    const customerID = req.user.id
    try {
        const cart = await Cart.findOne({ customerID }).populate("items.product")
        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        const totalPrice = cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);

        res.status(200).json({
            message: "Cart fetched successfully",
            cart,
            totalPrice
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}
