const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/quickcast';
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology are defaults in mongoose v6+
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // In production you might not want to exit immediately; keep simple for now
    process.exit(1);
  }
};

module.exports = connectDB;
