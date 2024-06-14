// routes/upload.routes.js
import express from "express";
import multer from "multer";
import { uploadCompanies } from "../controllers/upload.controller.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadCompanies);

export default router;
 