const { JourneyModel } = require("../model/JourneyModel.js");
const { TrainModel } = require("../model/TrainModel.js");
const { Op, Sequelize, where } = require("sequelize");
const trainRepository = require("./trainRepository.js");
// Utility function to log and throw errors
const handleError = (error, message) => {
    console.error(`[JourneyRepository] ${message}:`, error);
    throw new Error(message);
};

// 1️⃣ Create a new journey
const createJourney = async (newJourney) => {
    try {
      // Check if the train exists
      const trainExists = await trainRepository.retrieveOne({ train_id: newJourney.train_id });
  
      if (!trainExists) {
        throw new Error("Train not found");
      }
      console.log(newJourney)
      // Create the journey
      const createdJourney = await JourneyModel.create(newJourney);
      
      return createdJourney;
    } catch (error) {
      console.error("Error creating journey:", error.message);
      throw new Error("Failed to create journey.");
    }
  };
  

// 2️⃣ Retrieve a journey by journey ID
const getJourneyById = async (journeyId) => {
    try {
        const journey = await JourneyModel.findOne({
            where: { journey_id: journeyId },
            include: [
                {
                    model: TrainModel,
                    as: 'train',
                    attributes: ['train_id', 'train_name', 'source', 'destination']
                }
            ]
        });
        console.log(journey)
        if (!journey) throw new Error("Journey not found.");
        return journey;
    } catch (error) {
        handleError(error, `Failed to retrieve journey with ID ${journeyId}.`);
    }
};

// 3️⃣ Get all journeys
const getAllJourneys = async () => {
    try {
        return await JourneyModel.findAll({
            include: [
                {
                    model: TrainModel,
                    as: 'train',
                    attributes: ['train_id', 'train_name', 'source', 'destination']
                }
            ]
        });
    } catch (error) {
        handleError(error, "Failed to retrieve all journeys.");
    }
};

// 4️⃣ Get all journeys for a specific train
const getJourneysByTrain = async (trainId) => {
    try {
        return await JourneyModel.findAll({
            where: { train_id: trainId },
            include: [
                {
                    model: TrainModel,
                    as: 'train',
                    attributes: ['train_id', 'train_name']
                }
            ]
        });
    } catch (error) {
        handleError(error, `Failed to retrieve journeys for train ID ${trainId}.`);
    }
};

// 5️⃣ Get all journeys within a specific date range
const getJourneysByPath = async (source, destination) => {
    console.log("getJourneysByPath");
    try {
        const train = await TrainModel.findOne({
            where: {
                source: source,
                destination: destination
            }
        })
        console.log(train);
        if (!train) throw new Error("Journey's not found.");
        return await JourneyModel.findAll({
            where: {
                train_id: train.train_id
            },
            include: [
                {
                    model: TrainModel,
                    as: 'train',
                    attributes: ['train_id', 'train_name']
                }
            ]
        });
    } catch (error) {
        handleError(error, `Failed to retrieve journeys from ${startDate} to ${endDate}.`);
    }
};

// 6️⃣ Update journey details
const updateJourney = async (journeyId, updatedData) => {
    try {
        const journey = await JourneyModel.findByPk(journeyId);
        if (!journey) throw new Error("Journey not found.");

        await journey.update(updatedData);
        return journey;
    } catch (error) {
        handleError(error, `Failed to update journey with ID ${journeyId}.`);
    }
};

module.exports = {
    createJourney,
    getJourneyById,
    getAllJourneys,
    getJourneysByTrain,
    getJourneysByPath,
    updateJourney
};
