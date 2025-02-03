require("dotenv").config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe'); // Correct import for Stripe SDK

const PORT = process.env.PORT || 8000;
const app = express();
const db = require("./config/db")
const trainRoutes = require("./routes/trainRoutes.js");
const journeyRoutes = require("./routes/journeyRoutes.js");
const ticketRoutes = require("./routes/ticketRoutes.js");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the routes
app.use("/api/trains", trainRoutes);
app.use("/api/journeys", journeyRoutes);
app.use("/api/tickets", ticketRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
