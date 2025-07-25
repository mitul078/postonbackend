const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Invalid User"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}

exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next()
    }
}