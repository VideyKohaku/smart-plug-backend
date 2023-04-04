const express = require("express");
const asyncHandler = require('../middlewares/asyncHandler');
const ScenarioController = require('../controllers/scenario.controller');
const router = express.Router();

router.post('/', asyncHandler(ScenarioController.addScenario))
router.get('/', asyncHandler(ScenarioController.getAllScenarios))
router.get('/:sceneId', asyncHandler(ScenarioController.getScenario))
router.patch('/:sceneId', asyncHandler(ScenarioController.updateScenario))
router.delete('/:sceneId', asyncHandler(ScenarioController.removeScenario))

module.exports = router;