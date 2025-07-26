const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {updateRole} = require("../controllers/adminController")


router.patch("/update-role/:id" , verifyToken , checkRole("admin") , updateRole)


module.exports = router
