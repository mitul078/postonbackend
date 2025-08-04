const deliveryAssign = require("../models/DeliveryAssign")
const Package = require("../models/Package")
const User = require("../models/User")


exports.getOrders = async(req , res) =>{
    try {
        const agentId = req.user.id
        
        const orders = await deliveryAssign.find({agentID: agentId})
        .populate("packageID")
        .populate("agentID" , "username email")

        res.status(200).json({
            message: "Orders fetched"
            ,orders
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to get Order"
        })
    }
}

exports.updateStatus = async(req , res) => {
    const agentId = req.user.id
    const {packageId} = req.params
    const {location , status} = req.body

    try {
        const assignment = await deliveryAssign.findOne({
            agentID: agentId,packageID: packageId
        })
        if(!assignment) {
            return res.status(404).json({
                message: "Assignment not found or unauthorized"
            })
        }

        assignment.statusUpdate.push({
            time: new Date()
            ,location
            ,status
        })

        await assignment.save()

        await Package.findByIdAndUpdate(packageId , {
            currentStatus: status
        })

        if(status === "delivered") {
            await User.findByIdAndUpdate(agentId , {dutyStatus: "free"})
            await Package.findByIdAndUpdate(packageId , {deliveredAt: new Date()})
        }

        res.status(200).json({
            message: "Status Update Successfully"
            ,updates: assignment.statusUpdate
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        
    }
}