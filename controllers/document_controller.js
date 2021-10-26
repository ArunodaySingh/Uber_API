const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/Document");

const is_docvalid = async function (req, res) {
  try {
    console.log("hry");
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    //Extract prams
    const { adhaar, PAN, drivingLicence, addressProof } = requestBody;

    // Validation starts
    if (!validator.isValid(adhaar)) {
      res
        .status(400)
        .send({ status: false, message: "Adhaar Number is required" });
      return;
    }

    if (!validator.isValid(PAN)) {
      res
        .status(400)
        .send({ status: false, message: "PAN Number is required" });
      return;
    }

    if (!validator.isValid(drivingLicence)) {
      res
        .status(400)
        .send({ status: false, message: "drivingLicence Number is required" });
      return;
    }

    if (!validator.isValid(addressProof)) {
      res
        .status(400)
        .send({ status: false, message: "AddressProof  is Necessary" });
      return;
    }

// Validation ends
const doc_proof = {adhaar, PAN, drivingLicence, addressProof };
const valid_Doc = await userModel.create(doc_proof);

res.status(201).send({ status: true, message: "Success", data: valid_Doc });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = is_docvalid;
