const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/UserModel");
const Vehicle = require("../src/models/VehicleModel");

const Vehicle_Controller = async function (req, res) {
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
    const { Vehical_Type, length, width, height, weight } = requestBody;

    // Validation starts
    if (!validator.isValid(Vehical_Type)) {
      res
        .status(400)
        .send({ status: false, message: "Vehical_Type is required" });
      return;
    }

    if (!validator.isValid(length)) {
      res
        .status(400)
        .send({ status: false, message: "length of car is required" });
      return;
    }

    if (!validator.isValid(width)) {
      res.status(400).send({ status: false, message: "width is required" });
      return;
    }

    if (!validator.isValid(height)) {
      res.status(400).send({ status: false, message: "height  is required" });
      return;
    }

    if (!validator.isValid(weight)) {
      res.status(400).send({ status: false, message: "weight  is required" });
      return;
    }

    // Validation ends
    const Vehicle_proof = { Vehical_Type, length, width, height, weight };
    const Vehcile_data = await VehicleModel.create(Vehicle_proof);

    res
      .status(201)
      .send({ status: true, message: "Success", data: Vehcile_data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getvehicledetails = async function (req, res) {
  try {
    let a = req.params.id;
    userModel.findOne({ _id: a }, function (err, result) {
      if (!err) {
        res.send(result);
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getallvehicledetails = async function (req, res) {
  try {
    let a = req.params.id;
    userModel.find({}, function (err, result) {
      if (!err) {
        res.send(result);
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateVehicleDetails = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message:
          "Invalid request parameters. Please provide valid vehicle details",
      });
    }

    const newVehicleData = { ...requestBody };
    const newVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      newVehicleData,
      {
        new: true,
      }
    );

    res
      .status(200)
      .send({ status: true, message: "Success", data: newVehicle });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  Vehicle_Controller,
  getvehicledetails,
  getallvehicledetails,
  updateVehicleDetails,
};
