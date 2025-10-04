require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Create Express App
const app = express();

// Server configuration
const port = 5000;
const host = 'localhost';

// Allow requests from other origins (allows backend to interact with frontend)
app.use(cors());

// Connect to MongoDB + Start the server
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    // Start Server 
    app.listen(port, host, ()=> {console.log(`Server is running on http://${host}:${port}`)});
}).catch(err=>console.log(err));


app.use('/users', userRoutes);
app.use('/notes', noteRoutes);


