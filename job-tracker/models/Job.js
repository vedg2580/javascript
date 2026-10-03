const mongoose = require('mongoose');
const JOB_STATUS = require('../utils/constants');

const jobSchema = new mongoose.Schema({
    "company": {
        "type": String,
        "required": true,
        "trim": true
    },
    "status": {
        "type": String,
        "required": true,
        "trim": true,
        "enum": JOB_STATUS
    },
    "user": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "User",
        "required": true
    },
    "emailUsed": {
        "type": String,
        "required": true,
        "trim": true
    },
    "passwordRequired": {
        "type": Boolean,
        "required": true,
        "default": false
    },
    "passwordUsed":{
        "type": String,
        "trim": true,
        "required": false,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);