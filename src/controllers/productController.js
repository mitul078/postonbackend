const imagekit = require("../lib/imagekit");
const Product = require("../models/Product")

exports.addProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const files = req.files;

    try {
        const uploadedImages = [];
        for (const file of files) {
            const result = await imagekit.upload({
                file: file.buffer,
                fileName: `${Date.now()}-${file.originalname}`,
                folder: "products"
            });
            uploadedImages.push(result.url);
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            images: uploadedImages,
        });

        res.status(200).json({
            message: "Product created",
            product: newProduct,
        });
    } catch (err) {
        res.status(500).json({ message: "Product upload failed", error: err.message });
    }
};

exports.getProducts = async (req ,res)  => {
    try {
        const products = await Product.find()
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
