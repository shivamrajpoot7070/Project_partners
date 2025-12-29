import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/dbconnect.js';
import UserRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
//import applicationRouter from "./routes/application.route.js";

dotenv.config();

const PORT= process.env.PORT || 3000;

const app=express();

app.use(express.json());  //  middleware for coming post data
app.use(express.urlencoded({ extended: true })); // middleware for coming post data
app.use(cookieParser());

app.use(
    cors({
      origin: [
        "http://localhost:3000",                      // Localhost development
        "https://project-partners-khkm.vercel.app",   // Devtunnel URL
      ],
      credentials: true, // Required for withCredentials to work
    })
  );



app.get("/", (req, res) => res.send("Express on Vercel backend is deployed here!!"));

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();