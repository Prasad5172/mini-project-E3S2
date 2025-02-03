const { TicketRepository } = require('../repository/ticketRepository.js');
const { responseHandler } = require('../helpers/handler.js');

// Create a new ticket
const createTicket = async (newTicket) => {
  try {
    const createdTicket = await TicketRepository.createTicket(newTicket);
    return createdTicket;
  } catch (error) {
    throw new Error("Error occurred while creating the ticket.");
  }
};

// Retrieve all tickets
const getAllTickets = async (result) => {
  try {
    const tickets = await TicketRepository.getAllTickets();
    result(null, responseHandler(true, 200, 'Success', tickets));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Something went wrong!', null));
  }
};

// Retrieve a ticket by ID
const getTicketById = async (ticketId, result) => {
  try {
    const ticket = await TicketRepository.getTicketById(ticketId);
    if (!ticket) throw new Error("Ticket not found");
    result(null, responseHandler(true, 200, 'Success', ticket));
  } catch (error) {
    result(null, responseHandler(false, 500, error.message, null));
  }
};

// Retrieve tickets by journey ID
const getTicketsByJourney = async (journeyId, result) => {
  try {
    const tickets = await TicketRepository.getTicketsByJourney(journeyId);
    result(null, responseHandler(true, 200, 'Success', tickets));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error fetching tickets for this journey', null));
  }
};

// Update a ticket
const updateTicket = async (ticketId, updatedData, result) => {
  try {
    const updatedTicket = await TicketRepository.updateTicket(ticketId, updatedData);
    result(null, responseHandler(true, 200, 'Ticket updated successfully', updatedTicket));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error updating the ticket', null));
  }
};

// Delete a ticket
const deleteTicket = async (ticketId, result) => {
  try {
    await TicketRepository.deleteTicket(ticketId);
    result(null, responseHandler(true, 200, 'Ticket deleted successfully', null));
  } catch (error) {
    result(null, responseHandler(false, 500, 'Error deleting the ticket', null));
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketsByJourney,
  updateTicket,
  deleteTicket
};
