// controllers/upload.controller.js
import xlsx from "xlsx";
import Company from "../model/company.model.js";
import { errorHandler } from "../utils/error.js";

export const uploadCompanies = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"));
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const companies = xlsx.utils.sheet_to_json(worksheet);

    await Company.insertMany(companies);

    res.status(200).json({ message: "Companies added successfully" });
  } catch (error) {
    next(error);
  }
};
