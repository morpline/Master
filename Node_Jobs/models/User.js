const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.set('useFindAndModify', false);

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must provide name"],
    },
    email:{
        type:String,
        required:[true,"Must provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Must email valid"
        ],
        unique: true
    },
    password: {
        type: String,
        required:[true,"Must provide password"],
        minlength: 1,
    },

});
TaskSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
TaskSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME,
    });
}
TaskSchema.methods.comparePassword = async function (cna) {
    const isMatch = await bcrypt.compare(cna, this.password);
    return isMatch;
}
module.exports = mongoose.model("User",TaskSchema);