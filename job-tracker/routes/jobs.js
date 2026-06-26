const express = require('express');
const auth = require("../middleware/auth");
const router = express.Router();
const { getJobs, getJobById, createJob, updateJobById, deleteJobById } = require('../controllers/jobController');
const asyncHandler = require('../utils/asyncHandler');

router.get("/", auth, asyncHandler(getJobs));

router.get("/:id", auth, asyncHandler(getJobById));

router.post("/", auth, asyncHandler(createJob));

router.put("/:id", auth, asyncHandler(updateJobById));

router.delete("/:id", auth, asyncHandler(deleteJobById));

module.exports = router;