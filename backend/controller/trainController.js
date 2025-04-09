const { type } = require('os');
const trainService = require('../service/trainService.js');

// Controller to create a new train
const createTrainController = async (req, res) => {
  try {
    const { train_name,journey_distance,source,destination,total_ac,total_sl,total_gn } = req.body;
    if (!train_name || !journey_distance || !source || !destination || !total_ac || !total_sl || !total_gn) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    const newTrainDetails = req.body;
    const createdTrain = await trainService.createTrain(newTrainDetails);
    return res.status(201).json({
      success: true,
      message: 'Train created successfully',
      train: createdTrain
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get all trains
const getAllTrainsController = async (req, res) => {
  console.log("Train controller");
  try {
    await trainService.getAllTrains((err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get train by ID
const getTrainByIdController = async (req, res) => {
  try {
    const { trainId } = req.params;
    await trainService.getTrainById(parseInt(trainId), (err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get available seats for a train and class (AC, SL, GN)
const getAvailableSeatsController = async (req, res) => {
  try {
    const { trainId, classType } = req.params;
    await trainService.getAvailableSeats(trainId, classType, (err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTrainController,
  getAllTrainsController,
  getTrainByIdController,
  getAvailableSeatsController
};
