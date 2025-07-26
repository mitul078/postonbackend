const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {placeOrder, getOrder} = require("../controllers/customerController")


router.post("/make-order" , verifyToken , checkRole('customer') , placeOrder )
router.get("/get-orders" , verifyToken , checkRole("customer") , getOrder)

module.exports = router