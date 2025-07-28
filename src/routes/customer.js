const express = require("express")
const router = express.Router()
const multer = require("multer")
const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {placeOrder, getOrder} = require("../controllers/customerController")

const upload = multer({storage: multer.memoryStorage()})
router.post("/order" , verifyToken , checkRole('customer') , upload.single("productImage") , placeOrder )
router.get("/order" , verifyToken , checkRole("customer") , getOrder)

module.exports = router