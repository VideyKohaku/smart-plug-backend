const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const DeviceController = require('../controllers/device.controller');
const router = express.Router();

router.post('/', asyncHandler(DeviceController.addDevice));
// router.get('/:deviceId', (req, res) =>{
//     console.log(req.params)
// });
router.get('/', asyncHandler(DeviceController.getAllDevices));
router.get('/:deviceId', asyncHandler(DeviceController.getDevice));
router.patch('/:deviceId', asyncHandler(DeviceController.updateDevice));
router.delete('/:deviceId', asyncHandler(DeviceController.removeDevice));

module.exports = router;