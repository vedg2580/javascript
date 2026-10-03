const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.getUsers = async (req, res) => {
    const filters = {};

    if(!!req.query.email) filters.email = req.query.email;
    if(!!req.query.username) filters.username = req.query.username;
    if(!!req.query.name) filters.name = req.query.name;

    const users = await User.find(filters).select('-password');
    return res.json(users);
};

exports.signup = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
        "name": req.body.name,
        "email": req.body.email,
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