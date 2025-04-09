const { responseHandler } = require('../helpers/handler.js');
const { TrainModel } = require("../model/TrainModel.js");
const { JourneyModel } = require("../model/JourneyModel.js");

// 1️⃣ Create a new train
const create = async (newTrain) => {
    console.log("Creating a new train...");
    return await TrainModel.create(newTrain).catch((error) => {
        console.log(error.message);
        throw new Error("Some error occurred while creating the train.");
    });
};

// 2️⃣ Retrieve a specific train by train_id
const retrieveOne = async (params) => {
    console.log("Retrieving train by ID...",params);
    return await TrainModel.findOne({ where: params })
        .catch((error) => {
            console.log('Error retrieving train by ID:', error);
            throw new Error('Train not found');
        });
};

// 3️⃣ Get all trains
const retrieveAll = async () => {
    console.log("Retrieving all trains...");
    const queryResult = await TrainModel.findAll().catch((error) => {
        console.log(error);
        throw new Error("Error occurred while retrieving all trains.");
    });
    return queryResult;
};

// 4️⃣ Update train details
const updateTrain = async (trainId, updatedData) => {
    console.log("Updating train...");
    return await TrainModel.update(updatedData, { where: { train_id: trainId } })
        .then(() => {
            return { message: 'Train updated successfully' };
        })
        .catch((error) => {
            console.log('Error updating train:', error);
            throw new Error('Error updating train');
        });
};

// 5️⃣ Delete a train
const deleteTrain = async (trainId) => {
    console.log("Deleting train...");
    return await TrainModel.destroy({ where: { train_id: trainId } })
        .then(() => {
            return { message: 'Train deleted successfully' };
        })
        .catch((error) => {
            console.log('Error deleting train:', error);
            throw new Error('Error deleting train');
        });
};

// 6️⃣ Retrieve trains by route (source -> destination)
const getTrainByRoute = async (source, destination) => {
    console.log("Retrieving trains by route...");
    return await TrainModel.findAll({ where: { source, destination } })
        .catch((error) => {
            console.log('Error retrieving trains by route:', error);
            throw new Error('Error retrieving trains by route');
        });
};

// 7️⃣ Get all available seats for a specific journey
const getAllAvailableSeats = async (journeyId) => {
    console.log("Getting all available seats for journey...");

    const journey = await JourneyModel.findByPk(journeyId);
    if (!journey) throw new Error('Journey not found');

    return {
        AC: journey.avail_ac,
        SL: journey.avail_sl,
        GN: journey.avail_gn
    };
};

// 8️⃣ Get available seats for a specific journey and seat type
const getAvailableSeats = async (journeyId, seatType) => {
    console.log("Getting available seats for seat type...");
    const journey = await JourneyModel.findByPk(journeyId);
    if (!journey) throw new Error('Journey not found');

    switch (seatType) {
        case "AC":
            return journey.avail_ac;
        case "SL":
            return journey.avail_sl;
        case "GN":
            return journey.avail_gn;
        default:
            throw new Error('Invalid seat type');
    }
};

// 9️⃣ Update available seats for a specific journey and seat type
const updateAvailableSeats = async (journeyId, seatType, newCount) => {
    console.log("Updating available seats for seat type...");
    const journey = await JourneyModel.findByPk(journeyId);
    if (!journey) throw new Error('Journey not found');

    switch (seatType) {
        case "AC":
            journey.avail_ac = newCount;
            break;
        case "SL":
            journey.avail_sl = newCount;
            break;
        case "GN":
            journey.avail_gn = newCount;
            break;
        default:
            throw new Error('Invalid seat type');
    }

    return await journey.save();
};

// 🔟 Get the price for a specific train and seat type
const getPrice = async (trainId, seatType) => {
    console.log("Getting price for seat type...");
    const train = await TrainModel.findByPk(trainId);
    if (!train) throw new Error('Train not found');

    switch (seatType) {
        case "AC":
            return train.price_ac;
        case "SL":
            return train.price_sl;
        case "GN":
            return train.price_gn;
        default:
            throw new Error('Invalid seat type');
    }
};

const getTrainByRouteAndDate = async (source, destination, journeyDate) => {
    console.log("Retrieving trains by route and date...");

    return await JourneyModel.findAll({
        where: {
            start_time: {
                [Op.between]: [
                    new Date(journeyDate + " 00:00:00"), // Start of the day
                    new Date(journeyDate + " 23:59:59")  // End of the day
                ]
            }
        },
        include: {
            model: TrainModel,
            where: { source, destination }
        }
    }).catch((error) => {
        console.log('Error retrieving trains by route and date:', error);
        throw new Error('Error retrieving trains by route and date');
    });
};


module.exports = {
    create,
    retrieveOne,
    retrieveAll,
    updateTrain,
    deleteTrain,
    getTrainByRoute,
    getAvailableSeats,
    updateAvailableSeats,
    getPrice,
    getAllAvailableSeats
};
