const express = require("express");
const asyncHandler = require('../middlewares/asyncHandler');
const ScenarioController = require('../controllers/scenario.controller');
const protect = require("../middlewares/protect");
const ScenarioService = require("../services/scenario.service");
const router = express.Router();

router.use(protect)
router.post('/', asyncHandler(ScenarioController.createScenario))
router.get('/', asyncHandler(ScenarioController.getAllScenariosByUser))
router.get('/:sceneId', asyncHandler(ScenarioController.getScenario))
router.patch('/:sceneId', asyncHandler(ScenarioController.updateScenario))
router.delete('/:sceneId', asyncHandler(ScenarioController.removeScenario))
router.post('/:sceneId/activate', asyncHandler(ScenarioController.activateScenario))

module.exports = router;
