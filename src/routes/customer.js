const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {placeOrder} = require("../controllers/customerController")


router.post("/order" , verifyToken , checkRole('customer') , placeOrder )

module.exports = router