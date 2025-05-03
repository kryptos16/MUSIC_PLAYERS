const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // <-- This must match your folder/file

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
