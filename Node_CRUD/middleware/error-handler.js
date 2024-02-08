const customError = require("./custom-error");

const errorHandlerMiddleware = (err,req,res,next) => {
    console.log(err);
    if(err instanceof customError.CustomAPIError){
        returnres.status(err.statusCode).json({msg:err.message});
    }
    return res.status(500).json({msg:err});
}

module.exports = errorHandlerMiddleware;