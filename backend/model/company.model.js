// models/company.model.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: false,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    establishedDate: {
      type: Date,
      required: true,
    },
    totalProducts: {
      type: Number,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerImage: {
      type: String,
      required: false,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Add full-text search index on relevant fields
companySchema.index({
  name: "text",
  description: "text",
  addressLine1: "text",
  addressLine2: "text",
  contact: "text",
  location: "text",
  ownerName: "text",
  ownerEmail: "text",
});

const Company = mongoose.model("Company", companySchema);

export default Company;
