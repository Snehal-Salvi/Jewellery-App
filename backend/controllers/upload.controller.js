import xlsx from "xlsx";  
import Company from "../model/company.model.js"; 
import { errorHandler } from "../utils/error.js"; 

// Function to upload companies from Excel file
export const uploadCompanies = async (req, res, next) => {
  try {
    // Check if no file was uploaded
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"));
    }

    // Read the uploaded file buffer using xlsx library
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });

    // Get the name of the first sheet
    const sheetName = workbook.SheetNames[0];

    // Get the worksheet based on the sheet name
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON format
    const companies = xlsx.utils.sheet_to_json(worksheet);

    // Insert the parsed companies data into the MongoDB database
    await Company.insertMany(companies);

    // Respond with success message if insertion is successful
    res.status(200).json({ message: "Companies added successfully" });
  } catch (error) {
    // Pass any encountered errors to the error handling middleware
    next(error);
  }
};
