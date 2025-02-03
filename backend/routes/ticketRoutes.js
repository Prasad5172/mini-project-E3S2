const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController.js");
// const auth = require("../middleware/auth.js");

// Route to create a new ticket
router.route("/").post( ticketController.createTicketController);

// Route to get all tickets
router.route("/").get( ticketController.getAllTicketsController);

// Route to get ticket by ID
router.route("/:ticketId").get( ticketController.getTicketByIdController);

// Route to get tickets by journey ID
router.route("/journey/:journeyId").get( ticketController.getTicketsByJourneyController);

// Route to update a ticket
router.route("/:ticketId").put( ticketController.updateTicketController);

// Route to delete a ticket
router.route("/:ticketId").delete( ticketController.deleteTicketController);

module.exports = router;
