const express = require('express');
const router = express.Router();

let users = [];

let nextUserId = 1;

router.get("/", (req, res) => {
    return res.json(users);
});

router.post("/", (req, res) => {
    if(!req.body.name) return res.status(400).json({"message": "Name is missing"});
    const newUser = {
        "id": nextUserId++,
        "name": req.body.name
    };

    users.push(newUser);
    return res.json(newUser);
});

module.exports = router;