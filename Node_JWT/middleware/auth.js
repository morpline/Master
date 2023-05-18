const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");

const authenticationMiddleware = async (req,res,next) =>{
    console.log("TP1");
    const authHeader = req.headers.authorization || "";
    console.log("TP8", authHeader);
    // if(authHeader.split(" ")[1] == "null" || !authHeader || !authHeader.startwith("Bearer")){
    //     console.log("TP7");
    //     throw new UnAuthenticatedError("No token provided")
    // } else {
    //     console.log("TP9");
    // }
    console.log("TP2");
    const token = authHeader.split(" ")[1];
    console.log("TP3");
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("TP4");
        const {id,username} = decoded;
        req.user = {id,username};
        console.log("TP5");
        next();
    } catch (error) {
        console.log("TP6");
        throw new UnAuthenticatedError("You are not authorized to view this data.");
    }
}

module.exports = authenticationMiddleware;