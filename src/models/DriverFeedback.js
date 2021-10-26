const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const { validator } = require("../utils");
const { systemConfig } = require("../configs");

const driverFeedbackSchema = new mongoose.Schema(
  {
    listOfCheckBox: {
      //need to work on it
      type: String,
    },

    Rating: {
      type: ObjectId,
      ref: "Rating",
    },
    
    feedBack: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DriverFeedback", driverFeedbackSchema);
