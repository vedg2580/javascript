const express = require('express');
const app = express();
const connectDB = require('./config/db');
app.use(express.json());

const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');

app.use("/jobs", jobRoutes);
app.use("/users", userRoutes);

async function startServer(){
    try{
        await connectDB();
        app.listen(3000, () => {console.log("Server is running on port 3000")});
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

startServer();