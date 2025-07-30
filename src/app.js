const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');


const app = express()

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/customer", require("./routes/customer"))
app.use("/api/manager", require("./routes/manager"))
app.use("/api/agent", require("./routes/agent"))
app.use("/api/admin", require("./routes/admin"))
app.use("/api/cart" , require("./routes/cart"))
app.use("/api" , require("./routes/products"))

const { verifyToken, checkRole } = require("./middlewares/authMiddleware")
app.get("/api/admin-only", verifyToken, checkRole("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});


module.exports = app