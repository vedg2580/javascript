const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const users = await User.find(req.query);
        return res.json(users);
    } catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    try{
        if(!req.body.name?.trim()) return res.status(400).json({"message": "Name is missing"});
        const newUser = await User.create({
            "name": req.body.name
        });
        
        return res.status(200).json(newUser);
    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
});

module.exports = router;