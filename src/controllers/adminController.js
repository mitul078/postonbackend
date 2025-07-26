const User = require("../models/User")

exports.updateRole = async (req ,res) => {
    const {id}  = req.params

    const {role} = req.body
    try {
        const user = await User.findByIdAndUpdate(id , {role} , {new: true})

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User role Updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "Some error occurred"
        })
        
    }
}