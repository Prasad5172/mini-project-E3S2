const Sequelize = require("sequelize");
const db = require("../config/db");

const TrainModel = db.define("train", {
    train_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    train_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    journey_distance: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price_ac: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_ac: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avail_ac: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price_sl: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_sl: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avail_sl: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price_gn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_gn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avail_gn: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { 
    timestamps: false 
});


module.exports = { TrainModel };
