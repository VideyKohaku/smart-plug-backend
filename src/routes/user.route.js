const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const UserController = require('../controllers/user.controller');
const SensorController = require('../controllers/sensor.controller');
const router = express.Router();

router.get('/', asyncHandler(UserController.getAllUsers));
router.get('/:userID/devices', asyncHandler(SensorController.getAllSensorByUser));
// router.patch('/:deviceId', asyncHandler(DeviceController.updateDevice));
// router.delete('/:deviceId', asyncHandler(DeviceController.removeDevice));

module.exports = router;
