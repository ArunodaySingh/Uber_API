const express = require("express");
const path = require("path");
const router = express.Router();

const riderController=require ("./route/riderroute");
const driverController = require("./route/driverroute");
const addressController = require("./route/addressroute");
const bookingController = require("./route/bookingroute");
const cabController = require("./route/cabroute");
const documentController = require("./route/documentroute");
const FeedbackController = require("./route/driverfeedbackroute");
const driverStatusController = require("./route/driverstatusroute");
const paymentController = require("./route/paymentroute");
const ratingsController = require("./route/ratingroute");
const offerController = require("./route/offerroute");
const UserFeedbackController = require("./route/userfeedbackroute");
const VehicleController = require("./route/vehicleroute");
const walletController = require("./route/walletroute");

const userAuth = require("../middlewares/userAuth");

// rider routes
router.route('/riderregister').post(riderController.registerUser); //donetesting
router.route("/riderlogin").post(riderController.loginUser);
router.route("/updaterider/:id").patch(riderController.updateRider);

// driver routes
router.route("/driverregister").post(driverController.registerUser); //donetesting
router.route("/driverlogin").post(driverController.loginUser);
router.route("/updatedriver/:id").patch(driverController.updateDriver);

//address routes

//booking routes
router.route("/booking").post(bookingController.booking_controller);
router.route("/booking/:id").get(bookingController.getbookingdetails);

//cab routes
router.route("/cab").post(cabController.cab_controller); //donetesting
router.route("/cabs").get(cabController.getallcabdetails);
router.route("/cab/:id").get(cabController.getcabdetails);
router.route("/cab/:id").patch(cabController.updateCabDetails);

//document routes
router.route("/document").post(documentController.is_docvalid); //donetesting
router.route("/document/:id").get(documentController.getdocumentdetails);
router.route("/document/:id").patch(documentController.updateDocumentDetails);

//driver_Feedback routes
router.route("/driverfeedback").post(FeedbackController.DriverFeedback_Controller); //donetesting
router.route("/driverfeedback/:id").get(FeedbackController.Feedback_Controller);

//driver_Status routes 
router.route("/driverstatus").post(driverStatusController.DriverStatus_Controller);
router.route("/driverstatus/:id").patch(driverStatusController.updateDriverStatus);

//payment routes
router.route("/payment").post(paymentController.Paymnet_Controller);
router.route("/payment/:id").get(paymentController.PaymentbyID_Controller);

//ratings routes
router.route("/rating").post(ratingsController.Rating_Controller);
router.route("/rating/:id").get(ratingsController.RatingbyID_Controller);

//offer routes
router.route("/offer").post(offerController.Offer_Controller);
router.route("/offer/:id").get(offerController.OfferbyID_Controller);
router.route("/offer/:id").patch(offerController.offerUpdater);

//user_Feedback routes
router.route("/userfeedback").post(UserFeedbackController.UserFeedback_Controller);
router.route("/alluserfeedback").get(UserFeedbackController.Feedback_Controller);

//vehicle routes
router.route("/vehicle").post(VehicleController.Vehicle_Controller);
router.route("/vehicles").get(VehicleController.getallvehicledetails);
router.route("/vehicle/:id").get(VehicleController.getvehicledetails);
router.route("/vehicle/:id").patch(VehicleController.updateVehicleDetails);

//wallet routes
router.route("/wallet").post(walletController.Wallet_Controller);
router.route("/wallet").get(walletController.getwalletdetails);
router.route("/wallet/:id").patch(walletController.updateWalletDetails);

module.exports = router;