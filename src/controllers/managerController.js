const Package = require("../models/Package")
const DeliveryAssign = require("../models/DeliveryAssign")
const User = require("../models/User")

exports.assignAgent = async (req, res) => {
    const { packageID, agentID } = req.body

    try {
        const agent = await User.findOne({ _id: agentID, role: "agent" })
        if (!agent) return res.status(400).json({ message: "Invalid Agent" })

        const packageData = await Package.findById(packageID)
        if(!packageData) return res.status(400).json({message: "Package Invalid"})

        if(packageData.currentStatus !== "pending"){
            return res.status(400).json({
                message: "Order is assigned or in transit"
            })
        }

        const assignment = await DeliveryAssign.create({
            packageID,
            agentID,
            assignedAt: new Date(),
            statusUpdate: []
        })

        await Package.findByIdAndUpdate(packageID , {
            currentStatus: "Assigned",
            assignedAgentInfo: agentID,
            expectedDelivery: new Date(Date.now() + 3 * 24 * 60 *60  *1000) //3Days
        })
        
        res.status(200).json({
            message: "Assigned to an agent Successfully"
            ,assignment
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Assigned"
        })
    }
}