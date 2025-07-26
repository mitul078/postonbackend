const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

    const { username, email, password } = req.body

    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        const user = await User.create({
            username, email, password, role:"customer"
        })

        res.status(200).json({
            message: "User Registered Successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Registered Failed"
        })
    }
}

exports.login = async (req, res) => {
    const {email , password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const checkPass = user.password === password
        if(!checkPass) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        } , process.env.JWT_SECRET)

        res.cookie("token" , token)

        res.status(200).json({
            user: { id: user._id, role: user.role, email: user.email }
        })


    } catch (error) {
        return res.status(500).json({
            message: "Login Failed"
        })
        
    }
}