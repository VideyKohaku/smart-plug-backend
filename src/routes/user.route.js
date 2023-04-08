const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const UserController = require('../controllers/user.controller');
const SensorController = require('../controllers/sensor.controller');
const router = express.Router();

router.get('/', asyncHandler(UserController.getAllUsers));
router.get('/:userId/sensors', asyncHandler(SensorController.getAllSensorByUser));
// router.get('/:userID/sensors',(req)=>{ console.log(req.params)});
// router.patch('/:deviceId', asyncHandler(DeviceController.updateDevice));
// router.delete('/:deviceId', asyncHandler(DeviceController.removeDevice));

module.exports = router;
