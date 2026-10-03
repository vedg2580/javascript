const { z } = require('zod');
const JOB_STATUS = require('./utils/constants');

const UserSchema = z.object({
    "name": z.string().trim().min(2).max(50), 
    "email": z.string().email().toLowerCase(),
    "username": z.string().trim().min(4).max(20).regex(/^[a-zA-Z0-9_]+$/),
    "password": z.string().min(8).max(100),
    "age": z.number().positive().int().optional()
});

const JobSchema = z.object({
    "company": z.string().trim().min(2),
    "status": z.enum(JOB_STATUS)
});