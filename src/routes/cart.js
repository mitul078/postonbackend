const express = require("express")
const router = express.Router()

const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const { addToCart, seeCart, remove, checkout, getCheckoutDetail } = require("../controllers/cartController")

router.post("/addToCart" , verifyToken , checkRole("customer") , addToCart)
router.get("/seeCart" , verifyToken , checkRole("customer") , seeCart)
router.delete("/remove/:pid" , verifyToken , checkRole("customer") , remove)
router.post("/checkout" , verifyToken , checkRole("customer") , checkout)
router.get("/checkout" , verifyToken , checkRole("customer") , getCheckoutDetail)

module.exports = router