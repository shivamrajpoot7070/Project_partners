// import mongoose, { connect } from "mongoose";

// const connectDB = async () => {
//     try {
//       await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log("MongoDB connected successfully");
//     } catch (e) {
//       console.error("MongoDB connection error:", e.message);
//     }
//   };

// export default connectDB;
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err; 
  }
};

export default connectDB;
