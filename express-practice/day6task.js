const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let jobs = [];

let nextUserId = 1;
let nextJobId = 1;

app.post("/user", (req, res) => {
    if(!req.body.name) return res.status(400).json({"message": "Name missing"});
    const newUser = {
        "id": nextUserId++,
        "name": req.body.name
    };
    users.push(newUser);
    return res.json({"message": "User created"});
});

app.get("/users", (req, res) => {
    return res.json(users);
});

app.get("/jobs", (req, res) => {
    return res.json(jobs);
});

app.post("/jobs", (req, res) => {
    if(!req.body.company || !req.body.status) return res.status(400).json({"message": "Missing company or status"});
    const newJob = {
        "id": nextJobId++,
        "company": req.body.company,
        "status": req.body.status
    };
    jobs.push(newJob);
    return res.status(201).json(newJob);
});

app.put("/jobs/:id", (req, res) => {
    const jobId = Number(req.params.id);
    const job = jobs.find((j) => j.id === jobId)
    if(!job) return res.status(404).json({"message": "Job Id Not Found"});

    if(req.body.company) job.company = req.body.company;
    if(req.body.status) job.status = req.body.status;
    
    return res.json(job);
});

app.delete("/jobs/:id", (req, res) => {
    const jobId = Number(req.params.id);
    const job = jobs.find((j) => j.id === jobId);
    if(!job) return res.status(404).json({"message": "Job id Not Found"});
    
    jobs = jobs.filter((j) => j.id !== jobId);
    
    return res.json({"message": "Deleted"});
});

app.listen(3000, () => {console.log("Server is running")});