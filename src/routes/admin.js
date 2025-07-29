const express = require("express")
const router = express.Router()
const {verifyToken , checkRole} = require("../middlewares/authMiddleware")
const {updateRole} = require("../controllers/adminController")
const { addProduct } = require("../controllers/productController")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage() })

router.patch("/update-role/:id" , verifyToken , checkRole("admin") , updateRole)
router.post("/add-product" ,verifyToken , checkRole("admin") ,upload.array("images" , 5) ,addProduct )

module.exports = router
