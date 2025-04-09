const trainRepository = require('../repository/trainRepository.js');
const {responseHandler} = require('../helpers/handler.js');

// Create a new train
const createTrain = async (newTrain) => {
  console.log("Train service");
  try {
    const createdTrain = await trainRepository.create(newTrain);
    return createdTrain;
  } catch (error) {
    throw new Error("Error occurred while creating the train.");
  }
};

// Retrieve all trains
const getAllTrains = async (result) => {
  console.log("Train service");
  try {
    const trains = await trainRepository.retrieveAll();
    result(null, responseHandler(true, 200, 'Success', trains));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Something went wrong!', null));
  }
};

// Retrieve a train by ID
const getTrainById = async (trainId, result) => {
  console.log("Train service",trainId);
  try {
    const train = await trainRepository.retrieveOne({ train_id: trainId });
    console.log(train);
    if (!train) throw new Error("Train not found");
    result(null, responseHandler(true, 200, 'Success', train));
  } catch (error) {
    result(null, responseHandler(false, 500, error.message, null));
  }
};

// Retrieve available seats for a specific train and class (AC, SL, GN)
const getAvailableSeats = async (trainId, classType, result) => {
  try {
    const availableSeats = await trainRepository.getAvailableSeats(trainId, classType);
    result(null, responseHandler(true, 200, 'Available seats fetched successfully', availableSeats));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error fetching available seats', null));
  }
};

module.exports = {
  createTrain,
  getAllTrains,
  getTrainById,
  getAvailableSeats
};
