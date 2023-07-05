const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
// 
const register = async (req,res)=>{
    
    const users = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: users.name}, token});
    // 
};
const login = async (req,res)=>{
    // 
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please email or apssss.")
    }
    const user = await User.findOne({email});
    
    if(!user) {
        throw new UnauthenticatedError("Invalid credentials.")
    }
    const isPassCorr = await user.comparePassword(password);
    if(!password) {
        throw new UnauthenticatedError("Invalid credentials.")
    }
    const token = user.createJWT();
    res.status(StatusCodes.ACCEPTED).json({user: {name: users.name}, token});
};
//  const register = async (req, res) => {
//     res.send("register user")
// }

// const login = async (req, res) => {
//     res.send("login user")
// }

module.exports = {register,login}