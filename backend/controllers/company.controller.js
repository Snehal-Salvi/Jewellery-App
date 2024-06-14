// controllers/company.controller.js
 
import Company from "../model/company.model.js";
import { errorHandler } from "../utils/error.js";

export const createCompany = async (req, res, next) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return next(errorHandler(404, "Company not found"));
    }
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      return next(errorHandler(404, "Company not found"));
    }
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return next(errorHandler(404, "Company not found"));
    }
    res.status(200).json({ message: "Company deleted" });
  } catch (error) {
    next(error);
  }
};

export const searchCompanies = async (req, res, next) => {
  const { query } = req.query;
  try {
    const companies = await Company.find({
      $text: { $search: query }
    });
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
