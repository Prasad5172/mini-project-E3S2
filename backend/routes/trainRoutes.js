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


module.exports = router;
