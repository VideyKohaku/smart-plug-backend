const { CREATED, OK, DELETED } = require('../core/success.response')
const ScenarioService = require("../services/scenario.service")

class ScenarioController {
    static async addScenario(req, res) {
        new CREATED({
            message: "Scenario Added",
            metadata: await ScenarioService.addScenario(req.body),
        }).send(res);
    }

    static async getScenario(req, res) {
        new OK({
            message: "Scenario Found",
            metadata: await ScenarioService.getScenario(req.params),
        }).send(res);
    }

    static async removeScenario(req, res) {
        new DELETED({
            message: "Scenario Removed",
            metadata: await ScenarioService.deleteScenario(req.params),
        }).send(res)
    }
}

module.exports = ScenarioController;