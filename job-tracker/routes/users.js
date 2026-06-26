const express = require('express');
const { getUsers, signup, login } = require('../controllers/userController');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();

router.get("/", asyncHandler(getUsers));

router.post("/signup", asyncHandler(signup));

router.post('/login', asyncHandler(login));

module.exports = router;