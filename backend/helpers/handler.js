const { JourneyModel } = require("../model/JourneyModel.js");
const { TrainModel } = require("../model/TrainModel.js");

// 1️⃣ Create a new journey
const createJourney = async (newJourney) => {
    try {
        const createdJourney = await JourneyModel.create(newJourney);
        return createdJourney;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while creating the journey.");
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
                    as: 'train', // Assuming a relationship is set
                    attributes: ['train_id', 'train_name', 'from', 'to']
                }
            ]
        });
        if (!journey) throw new Error("Journey not found");
        return journey;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving the journey.");
    }
};

// 3️⃣ Get all journeys
const getAllJourneys = async () => {
    try {
        const journeys = await JourneyModel.findAll({
            include: [
                {
                    model: TrainModel,
                    as: 'train', // Assuming a relationship is set
                    attributes: ['train_id', 'train_name', 'from', 'to']
                }
            ]
        });
        return journeys;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving all journeys.");
    }
};

// 4️⃣ Get all journeys for a specific train
const getJourneysByTrain = async (trainId) => {
    try {
        const journeys = await JourneyModel.findAll({
            where: { train_id: trainId },
            include: [
                {
                    model: TrainModel,
                    as: 'train', // Assuming a relationship is set
                    attributes: ['train_id', 'train_name']
                }
            ]
        });
        return journeys;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving journeys for this train.");
    }
};

// 5️⃣ Get all journeys within a specific date range
const getJourneysByDateRange = async (startDate, endDate) => {
    try {
        const journeys = await JourneyModel.findAll({
            where: {
                timestartp: {
                    [Sequelize.Op.between]: [startDate, endDate]
                }
            },
            include: [
                {
                    model: TrainModel,
                    as: 'train', // Assuming a relationship is set
                    attributes: ['train_id', 'train_name', 'from', 'to']
                }
            ]
        });
        return journeys;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving journeys in the specified date range.");
    }
};

// 6️⃣ Update journey details
const updateJourney = async (journeyId, updatedData) => {
    try {
        const journey = await JourneyModel.findByPk(journeyId);
        if (!journey) throw new Error("Journey not found");
        
        // Update the journey with the new data
        await journey.update(updatedData);
        return journey;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while updating the journey.");
    }
};

module.exports = {
    createJourney,
    getJourneyById,
    getAllJourneys,
    getJourneysByTrain,
    getJourneysByDateRange,
    updateJourney
};
