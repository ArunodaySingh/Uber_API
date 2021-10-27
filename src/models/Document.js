const mongoose = require("mongoose");

const { validator } = require("../utils");
const { systemConfig } = require("../configs");

const documentSchema = new mongoose.Schema(
  {
    
    adhaar: {
      type: Number,
      required: "Adhaar No. is required",
    },
    PAN: {
      type: String,
      required: "PAN No. is required",
    },

    drivingLicence: {
      type: String,
      required: "DrivingLicence No. is required",
    },
    addressProof: {
      type: String,
      required: "drivingLicence is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
