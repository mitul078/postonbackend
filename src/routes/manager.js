const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware") 
const {assignAgent} = require("../controllers/managerController")

router.post("/assign" , verifyToken , checkRole("manager") , assignAgent)

module.exports = router