const express = require('express');
const auth = require("../middleware/auth");
const router = express.Router();

const Job = require('../models/Job');

router.get("/", auth, async (req, res) => {
    try{
        const jobs = await Job.find({
            "user": req.user.userId,
            ...req.query
        });
        return res.json(jobs);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.get("/:id", auth, async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findOne({
            "_id": jobId,
            "user": req.user.userId
        });
        if(!job) return res.status(404).json({"message": "Job not found"});

        return res.json(job);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.post("/", auth, async (req, res) => {
    try{
        if(!req.body.company?.trim() || !req.body.status?.trim()) return res.status(400).json({"message": "Company or Status missing"});

        const newJob = await Job.create({
            "company": req.body.company,
            "status": req.body.status,
            "user": req.user.userId
        });

        return res.status(201).json(newJob);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.put("/:id", auth, async (req, res) => {
    try{

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
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findOneAndDelete({
            "_id": jobId,
            "user": req.user.userId
        });
        
        if(!job) return res.status(404).json({"message": "Job Id Not Found"});
        
        return res.json({"message": "Deleted"});
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

module.exports = router;