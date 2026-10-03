const { z } = require('zod');

const UserSchema = z.object({
    "name": z.string().trim().min(2).max(50),
    "email": z.trim().email(),
    "username": z.string().trim().min(4).max(20).regex(/^[a-zA-Z0-9_]+$/),
    "password": z.string().min(8).max(100)
});

const UserLoginSchema = UserSchema.pick({
    "username": true,
    "password": true
});

module.exports = { UserSchema, UserLoginSchema };