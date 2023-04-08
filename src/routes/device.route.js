const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const DeviceController = require('../controllers/device.controller');
const protect = require('../middlewares/protect');
const router = express.Router();

router.post('/', protect, asyncHandler(DeviceController.createDevice));
router.get('/', asyncHandler(DeviceController.getAllDevices));
router.get('/:deviceId', asyncHandler(DeviceController.getDevice));
router.patch('/:deviceId', asyncHandler(DeviceController.updateDevice));
router.delete('/:deviceId', asyncHandler(DeviceController.removeDevice));

module.exports = router;
