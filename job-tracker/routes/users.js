const express = require('express');
const { getUsers, signup, login } = require('../controllers/userController');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { UserSchema, UserLoginSchema } = require('../schemas/userSchema');

router.get("/", auth, asyncHandler(getUsers));

router.post("/signup", validate(UserSchema), asyncHandler(signup));

router.post('/login', validate(UserLoginSchema), asyncHandler(login));

module.exports = router;