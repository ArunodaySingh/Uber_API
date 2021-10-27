const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/UserModel");
const DriverStatus = require("../src/models/DriverStatus");

const DriverStatus_Controller = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    //Extract prams
    const { accountStatus, ridingStatus, onRide } = requestBody;

    // Validation starts
    if (!validator.isValid(accountStatus)) {
      res.status(400).send({
        status: false,
        message: "accountStatus of Vehicle is required",
      });
      return;
    }

    if (!validator.isValid(ridingStatus)) {
      res.status(400).send({
        status: false,
        message: "ridingStatus of Vehicle is required",
      });
      return;
    }

    if (!validator.isValid(onRide)) {
      res
        .status(400)
        .send({ status: false, message: "onRide information is required" });
      return;
    }

    // Validation ends
    const driverStatus_info = { accountStatus, ridingStatus, onRide };
    const driverStatus_data = await Drivermodel.create(driverStatus_info);

    res
      .status(201)
      .send({ status: true, message: "Success", data: driverStatus_data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateDriverStatus = async (req, res) => {
  try {
    const driverStatusId = req.params.id;
    const requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message:
          "Invalid request parameters. Please provide valid Driver Status details",
      });
    }

    const newDriverStatusData = { ...requestBody };
    const newDriverStatus = await DriverStatus.findByIdAndUpdate(
      driverStatusId,
      newDriverStatusData,
      {
        new: true,
      }
    );

    res
      .status(200)
      .send({ status: true, message: "Success", data: newDriverStatus });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { DriverStatus_Controller, updateDriverStatus };
