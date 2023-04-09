const { CREATED, OK, DELETED } = require('../core/success.response')
const ScenarioService = require("../services/scenario.service")

class ScenarioController {
    static async addScenario(req, res) {
        new CREATED({
            message: "Scenario Added",
            metadata: await ScenarioService.addScenario(req.body),
        }).send(res);
    }

    static async getAllScenarios(req, res){
        new OK({
            message: "Scenarios",
            metadata: await ScenarioService.getAllScenarios()
        }).send(res)
    }

    static async getAllScenariosByUser(req, res){
        new OK({
            message: "Scenarios",
            metadata: await ScenarioService.getAllScenariosByUser(req.params)
        }).send(res)
    }

    static async getScenario(req, res) {
        new OK({
            message: "Scenario Found",
            metadata: await ScenarioService.getScenario(req.params),
        }).send(res);
    }

    static async updateScenario(req, res){
        new OK({
            message: "Scenario Updated",
            metadata: await ScenarioService.updateScenario(req.params, req.body)
        }).send(res)
    }

    static async removeScenario(req, res) {
        new DELETED({
            message: "Scenario Removed",
            metadata: await ScenarioService.deleteScenario(req.params),
        }).send(res)
    }
}

module.exports = ScenarioController;