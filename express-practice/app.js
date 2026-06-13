const express = require('express'); // importing express
const app = express(); // creating a server object

app.get("/", (request, response) => {
    // console.log(request);
    response.send("Welcome");
});

app.get("/first_page", (request, response) => {
    response.json({
        text: "this is the first page",
        page_number: 1
    });
});

app.get("/users/:id", (request, response) => {
    response.send(request.params.id);
});

app.get("/search", (req, res) => {
    res.send(req.query.name);
});

app.get("/about", (req, res) => {
    res.send("This is my first express app");
});

app.get("/user", (req, res) => {
    res.json({
        "name": "Ved",
        "role": "Developer"
    });
});

let jobsArray = [
    {
        "id": 1,
        "company": "TCS",
        "status": "Shortlisted"
    },
    {   
        "id": 2,
        "company": "Amazon",
        "status": "rejected"
    }
];

app.get("/jobs", (req, res) => {
    res.json(jobsArray);
});

app.get("/jobs/:id", (req, res) => {
    let job = jobsArray.find((j) => j.id === Number(req.params.id));

    if(!job){
        return res.status(404).json({
            "message": "Job id does not exist"
        });
    }

    return res.json(job);
});

app.get("/profile", (req, res) => {
    res.json({
        "name": "Ved",
        "role": "Software Developer"
    });
});

let companiesArray = [
    {
        "id": 1,
        "name": "Google"
    },
    {
        "id": 2,
        "name": "Amazon"
    }
];

app.get("/companies", (req, res) => {
    res.json(companiesArray);
});

app.get("/companies/search", (req, res) => {
    let name = companiesArray.find((c) => c.name === req.query.name);

    if(!name){
        return res.status(404).json({
            "message": "Company with given name not found"
        });
    }
    
    return res.json(name);
});

app.get("/companies/:companyId", (req, res) => {
    let company = companiesArray.find((c) => c.id === Number(req.params.companyId));

    if(!company){
        return res.status(404).json({
            "message": "Company not found"
        });
    }
    
    return res.json(company);
});

app.listen(3000, () => {
    console.log("server is running");
});