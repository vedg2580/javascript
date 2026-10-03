const express = require('express');
const auth = require("../middleware/auth");
const validate = require("../middleware/validate")
const router = express.Router();

const asyncHandler = require('../utils/asyncHandler');
const { jobSchema, jobPatchSchema, jobQuerySchema } = require('../schemas/jobSchema');

const { getJobs, getJobById, createJob, patchUpdateJobById, deleteJobById } = require('../controllers/jobController');

router.get("/", auth, validate(jobQuerySchema, "query"), asyncHandler(getJobs));

router.get("/:id", auth, asyncHandler(getJobById));

router.post("/", auth, validate(jobSchema), asyncHandler(createJob));

router.patch("/:id", auth, validate(jobPatchSchema), asyncHandler(patchUpdateJobById));

router.delete("/:id", auth, asyncHandler(deleteJobById));

module.exports = router;