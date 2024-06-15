import express from "express";
import multer from "multer";
import { uploadCompanies } from "../controllers/upload.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Multer configuration for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Route for handling POST requests to upload a file
router.post("/upload", verifyToken, upload.single("file"), uploadCompanies);

export default router;
