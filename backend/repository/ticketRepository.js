const { TicketModel } = require("../model/TicketModel.js");
const { JourneyModel } = require("../model/JourneyModel.js");
const { TrainModel } = require("../model/TrainModel.js");

// 1️⃣ Create a new ticket
const createTicket = async (newTicket) => {
    try {
        const createdTicket = await TicketModel.create(newTicket);
        return createdTicket;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while creating the ticket.");
    }
};

// 2️⃣ Retrieve a ticket by ticket ID
const getTicketById = async (ticketId) => {
    try {
        const ticket = await TicketModel.findOne({
            where: { ticket_id: ticketId },
            include: [
                {
                    model: JourneyModel,
                    as: 'journey', // Assuming a relationship is set
                    attributes: ['journey_id', 'train_id'],
                    include: [
                        {
                            model: TrainModel,
                            as: 'train', // Ensure this alias matches your association
                            attributes: ['train_name'] // Fetch train name
                        }
                    ]
                }
            ]
        });
        if (!ticket) throw new Error("Ticket not found");
        return ticket;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving the ticket.");
    }
};

const getTicketsByJourney = async (journeyId) => {
    try {
        const tickets = await TicketModel.findAll({
            where: { journey_id: journeyId },
            include: [
                {
                    model: JourneyModel,
                    as: 'journey',
                    attributes: ['journey_id', 'train_id'],
                    include: [
                        {
                            model: TrainModel,
                            as: 'train', // Ensure this alias matches your association
                            attributes: ['train_name'] // Fetch train name
                        }
                    ]
                }
            ]
        });
        return tickets;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving tickets for this journey.");
    }
};



// 4️⃣ Update ticket status
const updateTicketStatus = async (ticketId, status) => {
    try {
        const ticket = await TicketModel.findByPk(ticketId);
        if (!ticket) throw new Error("Ticket not found");
        
        ticket.status = status;
        await ticket.save();

        return ticket;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while updating ticket status.");
    }
};

// 5️⃣ Retrieve all tickets for a specific user
const getTicketsByUser = async (publickey) => {
    try {
        const tickets = await TicketModel.findAll({
            where: { owner: publickey },
            include: [
                {
                    model: JourneyModel,
                    as: 'journey', // Assuming a relationship is set
                    attributes: ['journey_id', 'train_id', 'timestartp']
                }
            ]
        });
        return tickets;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while retrieving tickets for this user.");
    }
};

// 6️⃣ Get available tickets for a train and seat type (AC, SL, GN)
const getAvailableTickets = async (trainId, seatType) => {
    try {
        // Retrieve the train's available seats
        const train = await TrainModel.findByPk(trainId);
        if (!train) throw new Error("Train not found");

        const availableSeats = {
            AC: train.avail_ac,
            SL: train.avail_sl,
            GN: train.avail_gn
        };

        const totalAvailableSeats = availableSeats[seatType] || 0;

        // Retrieve all tickets for the given train and seat type
        const tickets = await TicketModel.findAll({
            where: {
                train_id: trainId,
                ticket_seat_type: seatType,
                status: "ONSALE"
            }
        });

        // Calculate remaining available seats
        const soldSeats = tickets.length;
        const remainingSeats = totalAvailableSeats - soldSeats;

        return remainingSeats;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error occurred while checking available tickets.");
    }
};

module.exports = {
    createTicket,
    getTicketById,
    getTicketsByJourney,
    updateTicketStatus,
    getTicketsByUser,
    getAvailableTickets
};
