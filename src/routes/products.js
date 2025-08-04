const express = require("express")
const router = express.Router()

const { verifyToken, checkRole } = require("../middlewares/authMiddleware")
const { getProducts } = require("../controllers/productController")

router.get("/products" , verifyToken , checkRole("customer" , "agent") , getProducts)

module.exports = router