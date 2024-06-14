// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDb } from "./config/mongoose.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/auth.js"; 

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companies", verifyToken, companyRoutes); // Protected routes
app.use("/api/upload", verifyToken, uploadRoutes); // Protected routes

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
  connectToDb();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
