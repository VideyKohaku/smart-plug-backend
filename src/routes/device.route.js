const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const DeviceController = require('../controllers/device.controller');
const router = express.Router();

router.post('/', asyncHandler(DeviceController.addDevice));

module.exports = router;
