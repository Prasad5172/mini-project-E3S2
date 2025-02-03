const { responseHandler } = require('../helpers/handler.js');
const { TrainModel } = require("../model/TrainModel.js")


// 1️⃣ Create a new train
const create = async (newTrain) => {
    console.log("Creating a new train...");
    return await TrainModel.create(newTrain).catch((error) => {
        console.log(error.message);
        throw new Error("Some error occurred while creating the train.");
    });
};

// 2️⃣ Retrieve a specific train by train_id
const retrieveOne = async (trainId) => {
    console.log("Retrieving train by ID...");
    return await TrainModel.findOne({ where: { train_id: trainId } })
        .catch((error) => {
            console.log('Error retrieving train by ID:', error);
            throw new Error('Train not found');
        });
};

// 3️⃣ Get all trains
const retrieveAll = async (result) => {
    console.log("Retrieving all trains...");
    const queryResult = await TrainModel.findAll().catch((error) => {
        console.log(error);
        return result(responseHandler(false, 500, 'Something went wrong!', null), null);
    });
    return result(null, responseHandler(true, 200, 'Success', queryResult));
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

// 6️⃣ Retrieve trains by route (from -> to)
const getTrainByRoute = async (from, to) => {
    console.log("Retrieving trains by route...");
    return await TrainModel.findAll({ where: { from, to } })
        .catch((error) => {
            console.log('Error retrieving trains by route:', error);
            throw new Error('Error retrieving trains by route');
        });
};

const getAllAvailableSeats = async (trainId) => {
    console.log("Getting all available seats for train...");

    const train = await TrainModel.findByPk(trainId);
    if (!train) throw new Error('Train not found');

    const availableSeats = {
        AC: train.avail_ac,
        SL: train.avail_sl,
        GN: train.avail_gn
    };

    return availableSeats;
};

// 7️⃣ Get available seats for a specific train and seat type
const getAvailableSeats = async (trainId, seatType) => {
    console.log("Getting available seats for seat type...");
    const train = await TrainModel.findByPk(trainId);
    if (!train) throw new Error('Train not found');

    switch (seatType) {
        case "AC":
            return train.avail_ac;
        case "SL":
            return train.avail_sl;
        case "GN":
            return train.avail_gn;
        default:
            throw new Error('Invalid seat type');
    }
};

// 8️⃣ Update available seats for a specific seat type
const updateAvailableSeats = async (trainId, seatType, newCount) => {
    console.log("Updating available seats for seat type...");
    const train = await TrainModel.findByPk(trainId);
    if (!train) throw new Error('Train not found');

    switch (seatType) {
        case "AC":
            train.avail_ac = newCount;
            break;
        case "SL":
            train.avail_sl = newCount;
            break;
        case "GN":
            train.avail_gn = newCount;
            break;
        default:
            throw new Error('Invalid seat type');
    }

    return await train.save();
};

// 9️⃣ Get the price for a specific train and seat type
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
