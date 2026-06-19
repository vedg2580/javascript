const express = require('express');
const router = express.Router();

let jobs = [];

let nextJobId = 1;

router.get("/", (req, res) => {
    return res.json(jobs);
});

router.get("/:id", (req, res) => {
    const jobId = Number(req.params.id);
    const job = jobs.find((j) => j.id === jobId);
    if(!job) return res.status(404).json({"message": "Job not found"});

    return res.json(job);
});

router.post("/", (req, res) => {
    if(!req.body.company || !req.body.status) return res.status(400).json({"message": "Company or Status missing"});

    const newJob = {
        "id": nextJobId++,
        "company": req.body.company,
        "status": req.body.status
    };

    jobs.push(newJob);
    return res.status(201).json(newJob);
});

router.put("/:id", (req, res) => {
    const jobId = Number(req.params.id);
    const job = jobs.find((j) => j.id === jobId);

    if(!job) return res.status(404).json({"message": "Job Id Not found"});

    if(req.body.company) job.company = req.body.company;
    if(req.body.status) job.status = req.body.status;

    return res.json(job);
});

router.delete("/:id", (req, res) => {
    const jobId = Number(req.params.id);
    const job = jobs.find((j) => j.id === jobId);

    if(!job) return res.status(404).json({"message": "Job Id Not Found"});

    jobs = jobs.filter((j) => j.id !== jobId);

    return res.json({"message": "Deleted"});
});

module.exports = router;