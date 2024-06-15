import Company from "../model/company.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new company
export const createCompany = async (req, res, next) => {
  try {
    const company = new Company(req.body); // Create a new instance of Company model with request body
    await company.save(); // Save the company to the database
    res.status(201).json(company); // Respond with the saved company in JSON format
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Get all companies
export const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find(); // Retrieve all companies from the database
    res.status(200).json(companies); // Respond with the list of companies in JSON format
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Get a company by ID
export const getCompanyById = async (req, res, next) => {
  try {
    const companyId = req.params.id; // Extract company ID from request parameters
    const company = await Company.findById(companyId); // Find a company by its ID
    if (!company) {
      return next(errorHandler(404, "Company not found")); // If company is not found, pass a 404 error to the error handler middleware
    }
    res.status(200).json(company); // Respond with the found company in JSON format
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Update a company by ID
export const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Update company with new data and return the updated document
    });
    if (!company) {
      return next(errorHandler(404, "Company not found")); // If company is not found, pass a 404 error to the error handler middleware
    }
    res.status(200).json(company); // Respond with the updated company in JSON format
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Delete a company by ID
export const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id); // Find and delete a company by its ID
    if (!company) {
      return next(errorHandler(404, "Company not found")); // If company is not found, pass a 404 error to the error handler middleware
    }
    res.status(200).json({ message: "Company deleted" }); // Respond with a success message in JSON format
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Search companies based on a query string
export const searchCompanies = async (req, res, next) => {
  const { query } = req.query; // Extract the query string from request query parameters

  try {
    const companies = await Company.find({
      $text: { $search: query }, // Perform text search across indexed fields
    });

    res.status(200).json(companies); // Respond with the found companies in JSON format
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
