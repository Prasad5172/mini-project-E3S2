const express = require("express");
const router = express.Router();
const journeyController = require("../controller/journeyController.js");
// const auth = require("../middleware/auth.js");

// Route to create a new journey
router.route("/").post( journeyController.createJourneyController);

// Route to get all journeys
router.route("/").get( journeyController.getAllJourneysController);

router.route("/source_destination").get(journeyController.getJourneyByPathController);

// Route to get journeys by train ID
router.route("/train/:trainId").get(journeyController.getJourneysByTrainController);

// Route to get journeys by date range
router.route("/:journeyId").get( journeyController.getJourneyByIdController);

// Route to update a journey
router.route("/:journeyId").put( journeyController.updateJourneyController);

module.exports = router;
