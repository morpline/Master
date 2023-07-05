const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

const TaskSchema = new mongoose.Schema({
    position:{
        type:String,
        required:[true,"Must provide name"],
    },
    company: {
        type: String,
        required:[true,"Must provide name"],
    },
    stats:{
        type:String,
        enum:["interview","declined","pending"],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"REQUIRED"]
    }
},[{timestamps:true}]);

module.exports = mongoose.model("Job",TaskSchema);