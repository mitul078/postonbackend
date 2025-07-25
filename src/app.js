const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", require("./routes/auth"))

const { verifyToken, checkRole } = require("./middlewares/authMiddleware")
app.get("/api/admin-only", verifyToken, checkRole("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});


module.exports = app