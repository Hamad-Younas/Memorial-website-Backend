const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Routes imports
const authRoute = require('./routes/auth');
const profileRouter = require('./routes/profileData');
const bgRouter = require('./routes/backgroundImage');
const profileImgRouter = require('./routes/profileImage');
const ObituaryRouter = require('./routes/Obituary');
const WallRouter = require('./routes/memoryWall');

// Create the Express app
const app = express();
console.log(typeof app); // Should log 'function'

// Database connection
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:ndiRx3EwmrzEtAii@cluster1.ylbuwpb.mongodb.net/memorial-website");
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


// Handle MongoDB disconnection event
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});

// Set middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Set routes
app.use('/auth', authRoute);
app.use('/profile', profileRouter);
app.use('/bg', bgRouter);
app.use('/image', profileImgRouter);
app.use('/obituary', ObituaryRouter);
app.use('/wall', WallRouter);

// General error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  console.error('Error:', message);
  return res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack
  });
});

// Start server and connect to the database
const port = process.env.PORT || 8800;
app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}.`);
});

module.exports = app;