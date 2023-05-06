const { BadRequestError, NotFoundError } = require('../core/error.reponse');
const { CREATED, OK, DELETED } = require('../core/success.response');
const ScenarioService = require('../services/scenario.service');

class ScenarioController {
  static async createScenario(req, res) {
    const user = req.user;
    if (!user) throw NotFoundError('User does not found');
    new CREATED({
      message: 'Scenario Added',
      metadata: await ScenarioService.createScenario({ ...req.body, user })
    }).send(res);
  }

  static async getAllScenarios(req, res) {
    new OK({
      message: 'Scenarios',
      metadata: await ScenarioService.getAllScenarios()
    }).send(res);
  }

  static async getAllScenariosByUser(req, res) {
    const userId = req.user ? req.user.id : req.params.userId;
    new OK({
      message: 'Scenarios',
      metadata: await ScenarioService.getAllScenariosByUser({ userId })
    }).send(res);
  }

  static async getScenario(req, res) {
    new OK({
      message: 'Scenario Found',
      metadata: await ScenarioService.getScenario(req.params)
    }).send(res);
  }

  static async updateScenario(req, res) {
    new OK({
      message: 'Scenario Updated',
      metadata: await ScenarioService.updateScenario(req.params, req.body)
    }).send(res);
  }

  static async removeScenario(req, res) {
    new DELETED({
      message: 'Scenario Removed',
      metadata: await ScenarioService.deleteScenario(req.params)
    }).send(res);
  }

  static async activateScenario(req, res){
    new OK({
      message: "Scenario is activated",
      metadata: await ScenarioService.activateScenario(req.params)
    }).send(res);
  }
}

module.exports = ScenarioController;
