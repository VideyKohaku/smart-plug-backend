const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const protect = require('../middlewares/protect');
const AutomationController = require('../controllers/automation.controller');
const router = express.Router();

router.use(protect)
router.get('/', asyncHandler(AutomationController.getAllAutomations));
router.get('/:id', asyncHandler(AutomationController.getAutomation));
router.post('/', asyncHandler(AutomationController.createAutomation));
router.patch('/:id', asyncHandler(AutomationController.updateAutomation));
router.delete('/:id', asyncHandler(AutomationController.deleteAutomation));

module.exports = router;
