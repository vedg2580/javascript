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
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);