

class CustomAPIError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}
function createCustomError (msg, statusCode = 500) {
    return new CustomAPIError(msg,statusCode);
}

module.exports = { createCustomError, CustomAPIError};