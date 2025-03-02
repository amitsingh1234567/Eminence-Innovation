const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();
dotenv.config({path: './config.env'});

// Middleware to parse JSON and form data
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data (URL-encoded)

mongoose.connect(process.env.DB_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

const port = process.env.PORT
const server = app.listen(port, () => console.log(`App running on port ${port}`));