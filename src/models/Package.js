const mongoose = require("mongoose")

const packageSchema = mongoose.Schema({
    customerID : {type: mongoose.Schema.Types.ObjectId , ref:'User' ,required:true},
    origin: {type:String , required:true},
    destination: {type:String , required:true},
    currentStatus: {
        type:String,
        enum:['pending' , 'assigned' , 'in-transit' , 'delivered'],
        default:'pending'
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Package" , packageSchema)