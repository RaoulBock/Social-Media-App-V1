const mongoose = require("mongoose");

/**
 * The entry point for any reporting functionality would be the
 * company which is in question. Consolidated company reports can be pulled,
 * by means of referencing sequental queries on multiple companies.
 */
const CompanySchema = new mongoose.Schema({
  // The company's short name
  name: {
    type: String,
    required: "Company Name is required!"
  },
  // The company's descriptive name
  description: {
    type: String,
    required: "Company Description is required!"
  },
  // The country code which the company is associated with.
  country_code: {
    type: String,
    required: "Country code is required!"
  },
  // Whats the default fallback for any report ran for employees without group rules.
  default_group: {
    type: mongoose.Schema.ObjectId,
    ref: "access_groups"
  }
});

module.exports = {
  companies: mongoose.model("companies", CompanySchema)
};
