import express from "express";
import { sendQueryEmail } from "../controllers/email.controller.js";

const router = express.Router();

// Route for handling POST requests to send query emails
router.post("/", sendQueryEmail);

export default router;
