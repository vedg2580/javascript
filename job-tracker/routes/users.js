const express = require('express');
const { getUsers, signup, login } = require('../controllers/userController');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { userSchema, userLoginSchema } = require('../schemas/userSchema');

router.get("/", auth, asyncHandler(getUsers));

router.post("/signup", validate(userSchema), asyncHandler(signup));

router.post('/login', validate(userLoginSchema), asyncHandler(login));

module.exports = router;