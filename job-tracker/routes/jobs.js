const express = require('express');
const router = express.Router();

const Job = require('../models/Job');

router.get("/", async (req, res) => {
    try{
        const jobs = await Job.find(req.query);
        return res.json(jobs);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job) return res.status(404).json({"message": "Job not found"});

        return res.json(job);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    try{
        if(!req.body.company?.trim() || !req.body.status?.trim()) return res.status(400).json({"message": "Company or Status missing"});

        const newJob = await Job.create({
            "company": req.body.company,
            "status": req.body.status
        });

        return res.status(201).json(newJob);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.put("/:id", async (req, res) => {
    try{

        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        
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

router.delete("/:id", async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findByIdAndDelete(jobId);
        
        if(!job) return res.status(404).json({"message": "Job Id Not Found"});
        
        return res.json({"message": "Deleted"});
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

module.exports = router;