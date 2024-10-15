// app.js
const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./config/database.js');
const calculatorRoutes = require('./routes/operation.route.js');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
connectToDB();

// Routes
app.use('/api/calculators', calculatorRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});