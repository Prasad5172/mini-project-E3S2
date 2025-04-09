const ticketService = require('../service/ticketService.js');

// Controller to create a new ticket
const createTicketController = async (req, res) => {
  console.log("ticket controller");
  try {
    const {username,aadhar,owner,ticket_nft,journey_id,seat_type} = req.body;
    if (!username || !aadhar || !owner || !ticket_nft || !journey_id || seat_type in ['AC','SL','GN']) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }4
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
const getTicketsByJourneyController = async (req, res) => {
  try {
    const { journeyId } = req.params;
    await ticketService.getTicketsByJourney(journeyId,(err, response) => {
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
  console.log("ticket controller");
  try {
    const { ticketId } = req.query;
    console.log(ticketId)
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


// Controller to delete a ticket
const cancelTicketController = async (req, res) => {
  try {
    const { ticketId } = req.query;
    await ticketService.updateTicketStatus(ticketId,'CANCELLED', (err, response) => {
      if (err) {
        return res.status(500).json(err);
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
const moveTicketToSaleController = async (req, res) => {
  try {
    const { ticketId } = req.query;
    const {sale_price} = req.body;
    await ticketService.updateTicketStatus(ticketId,'ONSALE',sale_price, (err, response) => {
      if (err) {
        return res.status(500).json(err);
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

const cancelFromSaleController = async (req,res) => {
  try {
    const { ticketId } = req.query;
    await ticketService.updateTicketStatus(ticketId,'PAID', (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(response);
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
const updateTicketsByJourneyController = async (req, res) => {
  try {
    const { journeyId } = req.params; // Get journey_id from URL
    if (!journeyId) {
      return res.status(400).json({ success: false, message: "Journey ID is required" });
    }updateTicketsByJourneyController
    await ticketService.updateTicketStatusByJourney(journeyId,(err, response) => {
      if (err) {
        return res.status(500).json(err);
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

const transferTicketController = async (req, res) => {
  try {
    const { ticketId } = req.query;
    const {owner,aadhar} = req.body;
    await ticketService.transferTicket(ticketId,owner,aadhar,(err, response) => {
      if (err) {
        return res.status(500).json(err);
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
  getTicketByIdController,
  getTicketsByJourneyController,
  cancelTicketController,
  moveTicketToSaleController,
  updateTicketsByJourneyController,
  transferTicketController,
  cancelFromSaleController
};
