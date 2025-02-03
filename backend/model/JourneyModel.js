const Sequelize = require("sequelize");
const db = require("../config/db");
const { TrainModel } = require("./TrainModel");

const JourneyModel = db.define("journey", {
    journey_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    train_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: TrainModel,
            key: "train_id"
        },
        onDelete: "CASCADE"
    },
    start_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_time:{
        type: Sequelize.DATE,
        allowNull: false
    }
}, { timestamps: false });



module.exports = { JourneyModel };
