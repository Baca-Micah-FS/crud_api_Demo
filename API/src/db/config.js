// loads in mongoose package
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // connect mongo to env
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongoose COnnected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
