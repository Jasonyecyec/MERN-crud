const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://jason:jason123@cluster0.fd00gti.mongodb.net/mern_blog?retryWrites=true&w=majority"
    );
    console.log(`MongoDB connected:${conn.connection.host}`);
  } catch (err) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
