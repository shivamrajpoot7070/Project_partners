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

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err; // 🔥 VERY IMPORTANT
  }

  return cached.conn;
};

export default connectDB;
