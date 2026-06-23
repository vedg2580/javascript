const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    "company": {
        "type": String,
        "required": true
    },
    "status": {
        "type": String,
        "required": true
    }
});

module.exports = mongoose.model("Job", jobSchema);