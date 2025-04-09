const { TicketModel } = require("./TicketModel");
const { TrainModel } = require("./TrainModel");
const { JourneyModel } = require("./JourneyModel");

// Define associations
TrainModel.hasMany(JourneyModel, { foreignKey: "train_id", as: "journeys", onDelete: "CASCADE" });
JourneyModel.belongsTo(TrainModel, { foreignKey: "train_id", as: "train" });

// Fixing the TicketModel association with correct column name
JourneyModel.hasMany(TicketModel, { foreignKey: "journey_id", as: "tickets", onDelete: "CASCADE" });
TicketModel.belongsTo(JourneyModel, { foreignKey: "journey_id", as: "journey" });

module.exports = {
    TrainModel,
    TicketModel,
    JourneyModel
};
