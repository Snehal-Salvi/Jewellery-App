import express from "express";
import multer from "multer";
import { uploadCompanies } from "../controllers/upload.controller.js";

const router = express.Router();

// Multer configuration for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Route for handling POST requests to upload a file
router.post("/upload", upload.single("file"), uploadCompanies);

export default router;
