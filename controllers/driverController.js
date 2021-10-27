const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/DriverModel");
const Driver = require("../src/models/DriverModel");

const registerUser = async function (req, res) {
  try {
    const requestBody = req.body;
    console.log("i triggerd" + requestBody);
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    // Extract params
    const {
      name,
      phone,
      email,
      password,
      address,
      dlno,
      dl_expiry,
      riderId,
      docId,
      cabId,
      gender,
    } = requestBody;

    // Validation starts

    if (!validator.isValid(name)) {
      res.status(400).send({ status: false, message: "Name is required" });
      return;
    }

    if (!validator.isValid(phone)) {
      res.status(400).send({ status: false, message: "Phone is required" });
      return;
    }

    const isPhoneAlreadyUsed = await userModel.findOne({ phone });

    if (isPhoneAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${phone} phone is already registered`,
      });
      return;
    }

    if (!validator.isValid(email)) {
      res.status(400).send({ status: false, message: "Email is required" });
      return;
    }

    if (!validator.validateEmail(email)) {
      res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });
      return;
    }

    const isEmailAlreadyUsed = await userModel.findOne({ email });

    if (isEmailAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
      return;
    }

    if (!validator.isValid(password)) {
      res.status(400).send({ status: false, message: `Password is required` });
      return;
    }

    if (password.split("").length < 8) {
      res.status(400).send({
        status: false,
        message: `Password must be more than 8 digits and less than 15 digits`,
      });
      return;
    }

    if (password.split("").length > 15) {
      res.status(400).send({
        status: false,
        message: `Password must be more than 8 digits and less than 15 digits`,
      });
      return;
    }

    if (!validator.isValid(address)) {
      res.status(400).send({ status: false, message: "Address is required" });
      return;
    }

    if (!validator.isValid(dlno)) {
      res.status(400).send({ status: false, message: "DlNo. is required" });
      return;
    }

    if (!validator.isValid(dl_expiry)) {
      res.status(400).send({ status: false, message: "dl_expiry is required" });
      return;
    }

    if (!validator.isValid(riderId)) {
      res.status(400).send({ status: false, message: "riderId is required" });
      return;
    }

    if (!validator.isValid(docId)) {
      res.status(400).send({ status: false, message: "docId is required" });
      return;
    }

    if (!validator.isValid(cabId)) {
      res.status(400).send({ status: false, message: "cabId is required" });
      return;
    }

    if (!validator.isValid(gender)) {
      res.status(400).send({ status: false, message: "Enter Your Gender" });
      return;
    }

    // Validation ends

    const userData = {
      name,
      phone,
      email,
      password,
      address,
      dlno,
      dl_expiry,
      riderId,
      docId,
      cabId,
      gender,
    };
    const newUser = await userModel.create(userData);

    res.status(201).send({ status: true, message: "Success", data: newUser });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide login details",
      });
      return;
    }

    // Extract params
    const { email, password } = requestBody;

    // Validation starts
    if (!validator.isValid(email)) {
      res.status(400).send({ status: false, message: `Email is required` });
      return;
    }

    if (!validator.isValid(password)) {
      res.status(400).send({ status: false, message: `Password is required` });
      return;
    }

    const user = await userModel.findOne({ email, password });

    if (!user) {
      res
        .status(401)
        .send({ status: false, message: `Invalid Email or Password` });
      return;
    }

    const token = await jwt.createToken({ userId: user._id });

    res.header("x-api-key", token);
    res.status(200).send({ status: true, message: `Success`, data: { token } });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message:
          "Invalid request parameters. Please provide valid driver details",
      });
    }

    const newDriverData = { ...requestBody };
    const newDriver = await Driver.findByIdAndUpdate(driverId, newDriverData, {
      new: true,
    });

    res.status(200).send({ status: true, message: "Success", data: newDriver });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateDriver,
};
