const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.getUsers = async (req, res) => {
    const users = await User.find(req.query).select('-password');
    return res.json(users);
};

exports.signup = async (req, res) => {
    if(!req.body.name?.trim() || !req.body.username?.trim() || !req.body.password?.trim()) return res.status(400).json({"message": "Missing data"});

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
        "name": req.body.name,
        "username": req.body.username,
        "password": hashedPassword
    });
    
    return res.status(201).json({
        "_id": newUser._id,
        "name": newUser.name,
        "username": newUser.username
    });
};

exports.login = async (req, res) => {
    if(!req.body.username || !req.body.password) return res.status(400).json({"message": "Missing Data"});
    const user = await User.findOne({"username": req.body.username});
    if(!user) return res.status(401).json({"message": "Invalid Combination"});
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(validPassword) {
        const token = jwt.sign({
            "userId": user._id,
            "username": user.username
        }, config.jwtSecret);
        return res.status(200).json({token, "message": "Login Successful"});
    }
    return res.status(401).json({"message": "Invalid Combination"});
};