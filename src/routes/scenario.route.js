const express = require("express");
const asyncHandler = require('../middlewares/asyncHandler');
const ScenarioController = require('../controllers/scenario.controller');
const router = express.Router();

router.post('/', asyncHandler(ScenarioController.addScenario))
router.get('/:sceneId', asyncHandler(ScenarioController.getScenario))
router.delete('/:sceneId', asyncHandler(ScenarioController.removeScenario))

module.exports = router;