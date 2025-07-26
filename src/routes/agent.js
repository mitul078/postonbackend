const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {getOrders , updateStatus} = require("../controllers/agentController")

router.get("/orders" , verifyToken , checkRole("agent") , getOrders)
router.patch("/update/:packageId" , verifyToken , checkRole("agent") , updateStatus)

module.exports = router