const journeyRepository = require('../repository/journeyRepository.js');
const trainRepository = require('../repository/trainRepository.js');
const { responseHandler } = require('../helpers/handler.js');

// Create a new journey
const createJourney = async (newJourney) => {
  try {
    const createdJourney = await journeyRepository.createJourney(newJourney);
    return createdJourney;
  } catch (error) {
    throw new Error("Error occurred while creating the journey.");
  }
};

// Retrieve all journeys
const getAllJourneys = async (result) => {
  try {
    const journeys = await journeyRepository.getAllJourneys();
    result(null, responseHandler(true, 200, 'Success', journeys));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Something went wrong!', null));
  }
};

// Retrieve a journey by ID
const getJourneyById = async (journeyId, result) => {
  try {
    const journey = await journeyRepository.getJourneyById(journeyId);
    result(null, responseHandler(true, 200, 'Success', journey));
  } catch (error) {
    result(null, responseHandler(false, 500, error.message, null));
  }
};

// Get all journeys for a specific train
const getJourneysByTrain = async (trainId, result) => {
  try {
    const journeys = await journeyRepository.getJourneysByTrain(trainId);
    result(null, responseHandler(true, 200, 'Success', journeys));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error fetching journeys for this train', null));
  }
};

// Get journeys by date range
const getJourneysByPath = async (source, destination, result) => {
  console.log("getJourneysByPath");
  try {
    const journeys = await journeyRepository.getJourneysByPath(source, destination);
    result(null, responseHandler(true, 200, 'Success', journeys));
  } catch (error) {
    result(responseHandler(false, 500, 'Error fetching journeys in the date range', null),null );
  }
};

// Update a journey
const updateJourney = async (journeyId, updatedData, result) => {
  try {
    const updatedJourney = await journeyRepository.updateJourney(journeyId, updatedData);
    result(null, responseHandler(true, 200, 'Journey updated successfully', updatedJourney));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error updating the journey', null));
  }
};

module.exports = {
  createJourney,
  getAllJourneys,
  getJourneyById,
  getJourneysByTrain,
  getJourneysByPath,
  updateJourney
};
