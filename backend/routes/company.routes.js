// routes/company.routes.js
import express from "express";
import { createCompany, getCompanies, getCompany, updateCompany, deleteCompany, searchCompanies } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/", getCompanies);
router.get("/search", searchCompanies);
router.get("/:id", getCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
