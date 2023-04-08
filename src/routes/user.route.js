const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const UserController = require('../controllers/user.controller');
const SensorController = require('../controllers/sensor.controller');
const ScenarioController = require("../controllers/scenario.controller");
const DeviceController = require("../controllers/device.controller");
const router = express.Router();

router.get('/', asyncHandler(UserController.getAllUsers));
router.get('/:userId/sensors', asyncHandler(SensorController.getAllSensorByUser));
router.get('/:userId/scenarios', asyncHandler(ScenarioController.getAllScenariosByUser));
router.get('/:userId/devices', asyncHandler(DeviceController.getAllDevicesByUser));
// router.patch('/:deviceId', asyncHandler(DeviceController.updateDevice));
// router.delete('/:deviceId', asyncHandler(DeviceController.removeDevice));

module.exports = router;
