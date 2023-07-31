const mongoose = require("mongoose");

// mongoose.set('useFindAndModify', false);

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must provide name"],
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Must provide password"],
        trim:true,
    },
    token:{
        type:String,
        required:[true,"Must provide token"],
        trim:true,
    },
    exp:{
        type:Number,
        default:false
    }
});

module.exports = mongoose.model("User",TaskSchema);