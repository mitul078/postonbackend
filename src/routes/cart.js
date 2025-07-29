const express = require("express")
const router = express.Router()

const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const { addToCart, seeCart } = require("../controllers/cartController")

router.post("/addToCart" , verifyToken , checkRole("customer") , addToCart)
router.get("/seeCart" , verifyToken , checkRole("customer") , seeCart)

module.exports = router