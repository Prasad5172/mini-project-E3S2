const Sequelize = require("sequelize");
const db = require("../config/db");
const { TrainModel } = require("./TrainModel");

const JourneyModel = db.define(
  "journey",
  {
    journey_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    train_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "trains",
        key: "train_id",
      },
      onDelete: "CASCADE",
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    avail_ac: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    avail_sl: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    avail_gn: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    price_ac: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    price_sl: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    price_gn: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: false }
);

// ✅ Set default values dynamically before creation
JourneyModel.beforeCreate(async (journey) => {
  const train = await TrainModel.findByPk(journey.train_id);
  if (!train) {
    throw new Error("Train not found");
  }
  journey.avail_ac = train.total_ac;
  journey.avail_sl = train.total_sl;
  journey.avail_gn = train.total_gn;
});




module.exports = { JourneyModel };
