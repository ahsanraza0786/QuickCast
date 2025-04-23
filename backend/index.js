// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const connectDB = require('./db/connection.js');
const userRoutes = require('./routers/userRoutes.js');

// Load environment variables from .env
dotenv.config();

// Initialize app
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/user', userRoutes);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


