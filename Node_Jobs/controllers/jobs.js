const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({createdBy: req.user.userId}).sort("createdAt");
    res.status(StatusCodes.OK).json({jobs, count: jobs.length });
    
};
const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
    
    

};
const getjob = async (req,res)=>{
    
    const job = await Job.findOne({ _id: req.params.id,createdBy: req.user.userId});
    if(!job) {
        throw new NotFoundError("no job kek");
        // return next(customError.createCustomError(`No job with id: ${req.params.id}`,404));
        // return res.status(404).json({msg: })
    } else {
        res.status(StatusCodes.OK).json({job});

    }
    
};
const updatejob = async (req,res)=>{
    
    const job = await Job.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user.userId},
        {company:req.body.company,position:req.body.position},
        {new:true,runValidators:true}
    );

    if(!job) {
        throw new NotFoundError("There is no job with that name in this building.")
    } else {
        res.status(200).json({job});
    }
};
const deletejob =  async (req,res)=>{
    
    const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId});
    if(!job) {
        // return next(customError.createCustomError(`No job with id: ${req.params.id}`,404));
        // return res.status(404).json({msg: })
    } else {
        res.status(200).send();

    }
};

module.exports = {getAllJobs,createJob, getjob, updatejob, deletejob};

