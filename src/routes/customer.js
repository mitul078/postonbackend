const express = require("express")
const router = express.Router()

const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {placeOrder, getOrder} = require("../controllers/customerController")


router.post("/order" , verifyToken , checkRole('customer') , placeOrder )
router.get("/order" , verifyToken , checkRole("customer") , getOrder)


module.exports = router