import express from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  searchCompanies
} from '../controllers/company.controller.js';

const router = express.Router();

// Route for searching companies
router.get('/search', searchCompanies);

// CRUD routes for companies
router.post('/', createCompany); // Create a new company
router.get('/', getCompanies); // Get all companies
router.get('/:id', getCompanyById); // Get company by ID
router.put('/:id', updateCompany); // Update company by ID
router.delete('/:id', deleteCompany); // Delete company by ID

export default router;
