const Sequelize = require("sequelize");
const db = require("../config/db");
const { JourneyModel } = require("./JourneyModel");

const TicketModel = db.define("ticket", {
    ticket_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    aadhar: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    owner:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ticket_nft:{
        type: Sequelize.STRING,
        allowNull: false
    },
    journey_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "journeys",
            key: "journey_id"
        },
    },
    seat_type: {
        type: Sequelize.ENUM("AC", "SL", "GN"),
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("PAID", "CANCELLED", "ONSALE", "COMPLETED"),
        allowNull: false,
        defaultValue: "PAID"
    },
    sale_price: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, { timestamps: false });

module.exports = { TicketModel };
