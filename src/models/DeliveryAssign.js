const mongoose  = require("mongoose")

const deliveryAssignSchema = mongoose.Schema({
    packageID: {type:mongoose.Schema.Types.ObjectId , ref:'Package' , required: true },
    agentID: {type:mongoose.Schema.Types.ObjectId , ref:'User' , required: true},
    assignedAt: {type:Date , default: Date.now},
    statusUpdate: [{
        time:Date,
        location:String,
        status: String
    }]
})

module.exports = mongoose.model("DeliveryAssign" , deliveryAssignSchema)