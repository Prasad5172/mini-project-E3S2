const express = require("express");
const router = express.Router();
const trainController = require("../controller/trainController.js");
// const auth = require("../middleware/auth.js");

// Route to create a new train
router.route("/").post( trainController.createTrainController);

// Route to get all trains
router.route("/").get( trainController.getAllTrainsController);

// Route to get train by ID
router.route("/:trainId").get( trainController.getTrainByIdController);

// Route to get available seats for a specific train and class (AC, SL, GN)
router.route("/:trainId/seats/:classType").get( trainController.getAvailableSeatsController);

module.exports = router;
