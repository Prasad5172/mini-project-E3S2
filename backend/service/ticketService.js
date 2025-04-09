const ticketRepository = require('../repository/ticketRepository.js');
const journeyRepository = require('../repository/journeyRepository.js');
const { TrainModel } = require('../model/TrainModel.js');
const { JourneyModel } = require('../model/JourneyModel.js');
const { TicketModel } = require('../model/TicketModel.js');
const { responseHandler } = require('../helpers/handler.js');
const Sequelize = require("sequelize");

// Create a new ticket
const createTicket = async (newTicket) => {
  console.log("ticket service");
  try {
    const { journey_id, seat_type } = newTicket;
    
    // Fetch the journey using primary key
    const journey = await JourneyModel.findByPk(journey_id);
    if (!journey) {
      throw new Error("Journey not found");
    }

    const { price_ac, price_sl, price_gn } = journey;
    let price = 0;

    if (seat_type === "AC") {
      price = price_ac;
      journey.avail_ac -= 1;  // Decrease AC seat count
    } else if (seat_type === "SL") {
      price = price_sl;
      journey.avail_sl -= 1;  // Decrease Sleeper seat count
    } else {
      price = price_gn;
      journey.avail_gn -= 1;  // Decrease General seat count
    }
    let status = "Paid";

    // Save the updated journey (to persist seat reduction)
    await journey.save();

    // Create the ticket
    const createdTicket = await ticketRepository.createTicket({ ...newTicket, price, status });
    
    return createdTicket;
  } catch (error) {
    throw new Error("Error occurred while creating the ticket.");
  }
};


// Retrieve all tickets
const getTicketsByJourney = async (journeyId,result) => {
  try {
    const tickets = await ticketRepository.getTicketsByJourney(journeyId);
    result(null, responseHandler(true, 200, 'Success', tickets));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Something went wrong!', null));
  }
};

// Retrieve a ticket by ID
const getTicketById = async (ticketId, result) => {
  try {
    const ticket = await ticketRepository.getTicketById(ticketId);
    if (!ticket) throw new Error("Ticket not found");
    result(null, responseHandler(true, 200, 'Success', ticket));
  } catch (error) {
    result(null, responseHandler(false, 500, error.message, null));
  }
};



// Delete a ticket
const updateTicketStatus = async (ticketId,_status,sale_price, result) => {
  try {
    const ticket = await TicketModel.findByPk(ticketId);
    const {dataValues} = ticket;
    const { journey_id } = dataValues;
    const journey = await JourneyModel.findByPk(journey_id);
    const { seat_type,status } = dataValues;
    if (status === "CANCELLED" || status === "COMPLETED") {
      result(responseHandler(false, 400, 'Ticket already cancelled or completed', null),null);
      return;
    }
    if (_status === "CANCELLED") {
      if (seat_type === "AC") {
        journey.avail_ac += 1;  // Increase AC seat count
      } else if (seat_type === "SL") {
        journey.avail_sl += 1;  // Increase Sleeper seat count
      } else {
        journey.avail_gn += 1;  // Increase General seat count
      }
      ticket.status = "CANCELLED";
      ticket.save();
      result(null, responseHandler(true, 200, 'Ticket deleted successfully', null));
    }else if (_status === "ONSALE"){
      ticket.status = "ONSALE";
      ticket.sale_price = sale_price;
      ticket.save();
      result(null, responseHandler(true, 200, 'Ticket Moved to sale successfully', null));
    }else{
      result(responseHandler(false, 400, 'Invalid status', null),null);
    }
    result(null, responseHandler(true, 200, 'Ticket deleted successfully', null));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error deleting the ticket', null));
  }
};

const updateTicketStatusByJourney = async (journeyId, result) => {
  try {
    const updatedRows = await TicketModel.update(
      { status: "COMPLETED" }, // Set status to "Completed"
      { where: { journey_id: journeyId } } // Update all tickets with the given journey_id
    );

    if (updatedRows[0] === 0) {
      result(responseHandler(false, 400, "No tickets found for this journey", null), null);
      return;
    }

    result(null, responseHandler(true, 200, `Updated ${updatedRows[0]} tickets to 'COMPLETED'`, null));

  } catch (error) {
    console.error("Error updating ticket status:", error.message);
    result(responseHandler(false, 500, "Failed to update ticket status.", null), null);
  }
};

const transferTicket = async (ticketId,owner,aadhar,result) => {
  try {
    const ticket = await TicketModel.findByPk(ticketId);
    if (!ticket) {
     result( responseHandler(false, 404, 'Ticket not found', null),null);
     return;
    };
    const {dataValues} = ticket;
    const {status} = dataValues;
    if (status === "CANCELLED" || status === "COMPLETED") {
      result(responseHandler(false, 400, 'Ticket already cancelled or completed', null),null);
      return;
    }

    ticket.owner = owner;
    ticket.aadhar = aadhar;
    ticket.save();
    result(null, responseHandler(true, 200, 'Ticket transfered successfully', null));
  } catch (error) {
    result(responseHandler(false, 500, 'Error transfering the ticket', null), null);
  }
}
module.exports = {
  createTicket,
  getTicketById,
  getTicketsByJourney,
  updateTicketStatus,
  updateTicketStatusByJourney,
  transferTicket
};
