const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware") 
const {assignAgent, allAgents, assignedOrders, pendingOrders} = require("../controllers/managerController")

router.post("/assign" , verifyToken , checkRole("manager") , assignAgent)
router.get("/allAgents" , verifyToken , checkRole("manager") , allAgents)
router.get("/assignedOrders" , verifyToken , checkRole("manager") , assignedOrders)
router.get("/pendingOrders" , verifyToken , checkRole("manager") , pendingOrders)


module.exports = router