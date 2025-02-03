const ticketService = require('../service/ticketService.js');

// Controller to create a new ticket
const createTicketController = async (req, res) => {
  try {
    const newTicket = req.body;
    const createdTicket = await ticketService.createTicket(newTicket);
    return res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket: createdTicket
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get all tickets
const getAllTicketsController = async (req, res) => {
  try {
    await ticketService.getAllTickets((err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get ticket by ID
const getTicketByIdController = async (req, res) => {
  try {
    const { ticketId } = req.params;
    await ticketService.getTicketById(ticketId, (err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get tickets by journey ID
const getTicketsByJourneyController = async (req, res) => {
  try {
    const { journeyId } = req.params;
    await ticketService.getTicketsByJourney(journeyId, (err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to update a ticket
const updateTicketController = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updatedData = req.body;
    await ticketService.updateTicket(ticketId, updatedData, (err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to delete a ticket
const deleteTicketController = async (req, res) => {
  try {
    const { ticketId } = req.params;
    await ticketService.deleteTicket(ticketId, (err, response) => {
      if (err) {
        return res.status(500).json(response);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController,
  getTicketsByJourneyController,
  updateTicketController,
  deleteTicketController
};
