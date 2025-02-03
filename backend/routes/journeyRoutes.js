const express = require("express");
const router = express.Router();
const journeyController = require("../controller/journeyController.js");
// const auth = require("../middleware/auth.js");

// Route to create a new journey
router.route("/").post( journeyController.createJourneyController);

// Route to get all journeys
router.route("/").get( journeyController.getAllJourneysController);

// Route to get journey by ID
router.route("/:journeyId").get( journeyController.getJourneyByIdController);

// Route to get journeys by train ID
router.route("/train/:trainId").get( journeyController.getJourneysByTrainController);

// Route to get journeys by date range
router.route("/date-range").get( journeyController.getJourneysByDateRangeController);

// Route to update a journey
router.route("/:journeyId").put( journeyController.updateJourneyController);

module.exports = router;
