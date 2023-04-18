const express = require("express");
const asyncHandler = require('../middlewares/asyncHandler');
const ScenarioController = require('../controllers/scenario.controller');
const protect = require("../middlewares/protect");
const router = express.Router();

router.use(protect)
router.post('/', asyncHandler(ScenarioController.createScenario))
router.get('/', asyncHandler(ScenarioController.getAllScenarios))
router.get('/:sceneId', asyncHandler(ScenarioController.getScenario))
router.patch('/:sceneId', asyncHandler(ScenarioController.updateScenario))
router.delete('/:sceneId', asyncHandler(ScenarioController.removeScenario))

module.exports = router;
