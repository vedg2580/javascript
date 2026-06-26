const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
    const jobs = await Job.find({
        "user": req.user.userId,
        ...req.query
    });
    return res.json(jobs);
};

exports.getJobById = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findOne({
        "_id": jobId,
        "user": req.user.userId
    });
    if(!job) return res.status(404).json({"message": "Job not found"});

    return res.json(job);
};

exports.createJob = async (req, res) => {
    if(!req.body.company?.trim() || !req.body.status?.trim()) return res.status(400).json({"message": "Company or Status missing"});

    const newJob = await Job.create({
        "company": req.body.company,
        "status": req.body.status,
        "user": req.user.userId
    });

    return res.status(201).json(newJob);
};

exports.updateJobById = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findOne({
        "_id": jobId,
        "user": req.user.userId
    });
    
    if(!job) return res.status(404).json({"message": "Job Id Not found"});
    
    if(req.body.company) job.company = req.body.company;
    if(req.body.status) job.status = req.body.status;

    await job.save();

    return res.json(job);
};

exports.deleteJobById = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findOneAndDelete({
        "_id": jobId,
        "user": req.user.userId
    });
    
    if(!job) return res.status(404).json({"message": "Job Id Not Found"});
    
    return res.json({"message": "Deleted"});
};