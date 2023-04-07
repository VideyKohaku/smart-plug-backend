const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const SensorController = require('../controllers/sensor.controller');
const router = express.Router();

router.post("/", asyncHandler(SensorController.addSensor))

module.exports = router;