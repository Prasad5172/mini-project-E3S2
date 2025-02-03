const journeyService = require('../service/journeyService.js');

// Controller to create a new journey
const createJourneyController = async (req, res) => {
  try {
    const newJourney = req.body;
    const createdJourney = await journeyService.createJourney(newJourney);
    return res.status(201).json({
      success: true,
      message: 'Journey created successfully',
      journey: createdJourney
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Controller to get all journeys
const getAllJourneysController = async (req, res) => {
  try {
    await journeyService.getAllJourneys((err, response) => {
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

// Controller to get journey by ID
const getJourneyByIdController = async (req, res) => {
  try {
    const { journeyId } = req.params;
    await journeyService.getJourneyById(journeyId, (err, response) => {
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

// Controller to get all journeys for a specific train
const getJourneysByTrainController = async (req, res) => {
  try {
    const { trainId } = req.params;
    await journeyService.getJourneysByTrain(trainId, (err, response) => {
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

// Controller to get journeys by date range
const getJourneysByDateRangeController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    await journeyService.getJourneysByDateRange(startDate, endDate, (err, response) => {
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

// Controller to update a journey
const updateJourneyController = async (req, res) => {
  try {
    const { journeyId } = req.params;
    const updatedData = req.body;
    await journeyService.updateJourney(journeyId, updatedData, (err, response) => {
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
  createJourneyController,
  getAllJourneysController,
  getJourneyByIdController,
  getJourneysByTrainController,
  getJourneysByDateRangeController,
  updateJourneyController
};
