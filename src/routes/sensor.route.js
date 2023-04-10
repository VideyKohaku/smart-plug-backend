const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const SensorController = require('../controllers/sensor.controller');
const router = express.Router();

router.post("/", asyncHandler(SensorController.addSensor))
router.get("/", asyncHandler(SensorController.getAllSensor))
router.get("/:sensorId", asyncHandler(SensorController.getSensor))
router.patch("/:sensorId", asyncHandler(SensorController.updateSensor))
router.delete("/:sensorId", asyncHandler(SensorController.deleteSensor))
module.exports = router;