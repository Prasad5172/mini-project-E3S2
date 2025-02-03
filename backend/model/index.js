const { TicketModel } = require("./ticket");
const {TrainModel} = require("./train");
const {JourneyModel} = require("./journey");

// Define associations
TrainModel.hasMany(JourneyModel, { foreignKey: "train_id" });
JourneyModel.belongsTo(TrainModel, { foreignKey: "train_id" });

JourneyModel.hasMany(TicketModel, { foreignKey: "train_timestamp", sourceKey: "timestartp" });
TicketModel.belongsTo(JourneyModel, { foreignKey: "train_timestamp", targetKey: "timestartp" });

module.exports= {
    TrainModel,
    TicketModel,
    JourneyModel
}