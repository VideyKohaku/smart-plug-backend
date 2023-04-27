const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const protect = require('../middlewares/protect');
const SensorController = require('../controllers/sensor.controller');
const router = express.Router();

router.use(protect);
router.post('/', asyncHandler(SensorController.addSensor));
router.get('/', asyncHandler(SensorController.getAllSensorByUser));
module.exports = router;
