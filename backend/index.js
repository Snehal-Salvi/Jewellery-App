import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDb } from "./config/mongoose.js";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import contactRoutes from './routes/contact.routes.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(bodyParser.json()); // Parse incoming request bodies in JSON format

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,  
};
app.use(cors(corsOptions));  

app.use(cookieParser());  

// Test endpoint to check if the app is working
app.get("/", (req, res) => {
  res.send("App is working");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Company routes - publicly accessible
app.use("/api/companies", companyRoutes); 

// Middleware to protect routes that need authentication
app.use("/api/companies", verifyToken, (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
});

// Protected upload routes
app.use("/api/upload", verifyToken, uploadRoutes);

// Publicly accessible contact route
app.use('/api/contact', contactRoutes);

// Start the server and connect to the database
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
  connectToDb();
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
