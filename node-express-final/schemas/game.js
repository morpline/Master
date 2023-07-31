const mongoose = require("mongoose");

// mongoose.set('useFindAndModify', false);

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    game:{
        type:String,
        required:[true,"Must provide game"],
        trim:true,
    },
    players:{
        type:Array,
        required:[true,"Must provide player"],
        trim:true,
    },
    status:{
        type:Array,
        required:[true,"Must provide status"],
        trim:true,
    },
    turn:{
        type:Number,
        default:false
    },
    complete:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Game",TaskSchema);