const { TrainRepository } = require('../repository/trainRepository.js');
const { responseHandler } = require('../helpers/handler.js');

// Create a new train
const createTrain = async (newTrain) => {
  try {
    const createdTrain = await TrainRepository.create(newTrain);
    return createdTrain;
  } catch (error) {
    throw new Error("Error occurred while creating the train.");
  }
};

// Retrieve all trains
const getAllTrains = async (result) => {
  try {
    const trains = await TrainRepository.retrieveAll();
    result(null, responseHandler(true, 200, 'Success', trains));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Something went wrong!', null));
  }
};

// Retrieve a train by ID
const getTrainById = async (trainId, result) => {
  try {
    const train = await TrainRepository.retrieveOne({ train_id: trainId });
    if (!train) throw new Error("Train not found");
    result(null, responseHandler(true, 200, 'Success', train));
  } catch (error) {
    result(null, responseHandler(false, 500, error.message, null));
  }
};

// Retrieve available seats for a specific train and class (AC, SL, GN)
const getAvailableSeats = async (trainId, classType, result) => {
  try {
    const availableSeats = await TrainRepository.getAvailableSeats(trainId, classType);
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
