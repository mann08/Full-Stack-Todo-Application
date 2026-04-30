const mongoose = require("mongoose");

// Connect to MongoDB Atlas using the URI from environment variables
const connectDB = async () => {
  try {
    // If the user hasn't changed the default string, don't even try, it will just timeout
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes("cluster0.xxxxx.mongodb.net")) {
      console.warn("⚠️  WARNING: MongoDB URI is still the default placeholder.");
      console.warn("⚠️  Falling back to Local In-Memory mock data for demonstration.");
      return; 
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    console.warn("⚠️  Falling back to Local In-Memory mock data for demonstration.");
    // We intentionally removed process.exit(1) so the app keeps running
  }
};

module.exports = connectDB;
