const express = require('express');
const app = express();
app.use(express.json());

const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');

app.use("/jobs", jobRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {console.log("Server is running on port 3000")});