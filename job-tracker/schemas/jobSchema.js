const { z } = require('zod');
const JOB_STATUS = require('../utils/constants');

const JobSchema = z.object({
    "company": z.string().trim().min(1),
    "status": z.enum(JOB_STATUS),
    "emailUsed": z.email().trim(),
    "passwordRequired": z.boolean(),
    "passwordUsed": z.string().trim().min(1).optional()
}).superRefine((job, ctx) => {
    if(job.passwordRequired && !job.passwordUsed){
        ctx.addIssue({
            code: "custom",
            path: ["passwordUsed"],
            message: "passwordUsed needs to be present when passwordRequired is true"
        });
    }

    if(!job.passwordRequired && !!job.passwordUsed){
        ctx.addIssue({
            code: "custom",
            "path": ["passwordUsed"],
            message: "passwordUsed should not be provided when passwordRequired is false"
        });
    }
});

const JobPatchSchema = z.object({
    "company": z.string().trim().min(1),
    "status": z.enum(JOB_STATUS),
    "emailUsed": z.email().trim(),
    "passwordRequired": z.boolean(),
    "passwordUsed": z.string().trim().min(1).optional()
});

const JobQuerySchema = z.object({
    "status": z.enum(JOB_STATUS).optional(),
    "company": z.string().trim().min(1).optional(),
    "emailUsed": z.email().optional()
});

module.exports = { JobSchema, JobPatchSchema, JobQuerySchema };