const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must provide name"],
        trim:true,
        maxlength:[20,"name cannot be longer than 20 chars"]
    },
    comp:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Task",TaskSchema);