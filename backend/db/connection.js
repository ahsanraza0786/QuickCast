require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected Successfuly');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // process.exit(1);
  }
};
connectDB();

module.exports = mongoose;