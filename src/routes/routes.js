const express = require("express");
const path = require("path");
const router = express.Router();

const riderController = require("../../controllers/riderController");
const driverController = require("../../controllers/driverController");
const addressController = require("../../controllers/Address_controller");
const bookingController = require("../../controllers/bokking_controller");
const cabController = require("../../controllers/cab_controller");
const documentController = require("../../controllers/document_controller");
const FeedbackController = require("../../controllers/DriverFeedbackController");
const driverStatusController = require("../../controllers/DriverStatus_controller");
const offerController = require("../../controllers/Offer_Controller");
const paymentController = require("../../controllers/payment_controller");
const ratingsController = require("../../controllers/Ratings_Controller");
const UserFeedbackController = require("../../controllers/UserFeedback_Controller");
const VehicleController = require("../../controllers/Vehicle_Controller");
const walletController = require("../../controllers/wallet_controller");


const userAuth = require("../middlewares/userAuth");

// rider routes
router.post("/riderregister", riderController.registerUser); //donetesting
router.post("/riderlogin", riderController.loginUser);

// driver routes
router.post("/driverregister", driverController.registerUser); //donetesting
router.post("/driverlogin", driverController.loginUser);

//booking routes
router.post("/booking", bookingController.booking_controller);
router.get("/booking/:id",bookingController.getbookingdetails);

//cab routes
router.post("/cab", cabController.cab_controller); //donetesting
router.get("/cabs",cabController.getallcabdetails);
router.get("/cab/:id",cabController.getcabdetails);

//document routes
router.post("/document", documentController.is_docvalid); //donetesting
router.get("/document/:id",documentController.getdocumentdetails);

//driver_Feedback routes
router.post("/driverfeedback", FeedbackController.DriverFeedback_Controller); //donetesting
router.get("/driverfeedback/:id",FeedbackController.Feedback_Controller);

//driver_Status routes
router.post("/driverstatus", driverStatusController);

//payment routes
router.post("/payment", paymentController.Paymnet_Controller);
router.get("/payment/:id",paymentController.PaymentbyID_Controller);

//ratings routes
router.post("/rating", ratingsController.Rating_Controller);
router.get("/rating/:id",ratingsController.RatingbyID_Controller);

//offer routes
router.post("/offer", offerController.Offer_Controller);
router.get("/offer/:id",offerController.OfferbyID_Controller);

//user_Feedback routes
router.post("/userfeedback", UserFeedbackController.UserFeedback_Controller);
router.get("/alluserfeedback",UserFeedbackController.Feedback_Controller);


//vehicle routes
router.post("/vehicle", VehicleController.Vehicle_Controller);
router.get("/vehicles",VehicleController.getallvehicledetails);
router.get("/vehicle/:id",VehicleController.getvehicledetails);


//wallet routes
router.post("/wallet", walletController.Wallet_Controller);
router.get("/wallet",walletController.getwalletdetails);


module.exports = router;
