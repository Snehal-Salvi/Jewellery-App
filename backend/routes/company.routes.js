import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  searchCompanies,
} from "../controllers/company.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route for searching companies
router.get("/search", searchCompanies);

// CRUD routes for companies
router.post("/", verifyToken, createCompany); // Create a new company with token verification
router.get("/", getCompanies); // Get all companies
router.get("/:id", getCompanyById); // Get company by ID
router.put("/:id", verifyToken, updateCompany); // Update company by ID with token verification
router.delete("/:id", verifyToken, deleteCompany); // Delete company by ID with token verification

export default router;
