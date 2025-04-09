const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticketController.js");
const { route } = require("./trainRoutes.js");
// const auth = require("../middleware/auth.js");

// Route to create a new ticket
router.route("/").post( ticketController.createTicketController);

// Route to get all tickets
router.route("/journey/:journeyId").get( ticketController.getTicketsByJourneyController);
router.route("/journey/:journeyId").put( ticketController.updateTicketsByJourneyController); // change status to completed

// Route to get ticket by ID
router.route("/").get( ticketController.getTicketByIdController);


// Route to delete a ticket
router.route("/").delete( ticketController.cancelTicketController);
router.route("/sale").put( ticketController.moveTicketToSaleController);
router.route("/cancel_from_sale").put(ticketController.cancelFromSaleController);
router.route("/transfer").put( ticketController.transferTicketController);

module.exports = router;
