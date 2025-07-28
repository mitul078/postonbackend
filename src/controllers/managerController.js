const Package = require("../models/Package")
const DeliveryAssign = require("../models/DeliveryAssign")
const User = require("../models/User")

exports.assignAgent = async (req, res) => {
    const { packageID, agentID } = req.body
    try {
        const agent = await User.findOne({ _id: agentID, role: "agent" })
        if (!agent) return res.status(400).json({ message: "Invalid Agent" })

        const packageData = await Package.findById(packageID)
        if (!packageData) return res.status(400).json({ message: "Package Invalid" })

        if (packageData.currentStatus !== "pending") {
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

        await Package.findByIdAndUpdate(packageID, {
            currentStatus: "Assigned",
            assignedAgentInfo: agentID,
            expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) //3Days
        })

        res.status(200).json({
            message: "Assigned to an agent Successfully"
            , assignment
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Assigned"
        })
    }
}

exports.pendingOrders = async (req, res) => {
    try {
        const orders = await Package.find({ currentStatus: "pending" }).select("customerID origin destination ")
        if (orders.length === 0) {
            res.status(404).json({
                message: "No Orders Pending"
            })
        }
        res.status(200).json({
            message: "Fetched successfully",
            orders
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.assignedOrders = async (req, res) => {
    try {
        const orders = await Package.find({ currentStatus: "Assigned" }).select("assignedAgentInfo customerID").populate("assignedAgentInfo" ,"username email")


        if (orders.length === 0) {
            return res.status(404).json({
                message: "No assigned orders found"
            });
        }

        res.status(200).json({
            message: "Fetched successfully",
            orders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.allAgents = async (req, res) => {
    try {

        const agents = await User.find({ role: "agent" }).select("username email role")
        res.status(200).json({
            message: "All Agents Fetched",
            agents
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

