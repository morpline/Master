const asyncWrapper = (fn) => {
    return async (req,res,next) =>{
        try {
            await fn(req,res,next);
        } catch {
            next(error);
        }
    }
};

module.exports = asyncWrapper;