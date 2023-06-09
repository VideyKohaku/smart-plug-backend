const { ForbiddenError } = require('../core/error.reponse');
const { OK, CREATED, DELETED } = require('../core/success.response');
const AutomationService = require('../services/automation.service');

class AutomationController {
  static async getAllAutomations(req, res) {
    const user = req.user;
    if (!user) throw ForbiddenError('Not user found');
    new OK({
      message: 'List of automations',
      metadata: await AutomationService.getAllAutomations({ user })
    }).send(res);
  }

  static async getAllAutomationsByUser(req, res) {
    new OK({
      message: 'List of automations',
      metadata: await AutomationService.getAllAutomationsByUser(req.params)
    }).send(res);
  }

  static async getAutomation(req, res) {
    const id = req.params.id;
    console.log(id);
    new OK({
      message: `Automation with id ${id}`,
      metadata: await AutomationService.getAutomation(id)
    }).send(res);
  }

  static async createAutomation(req, res) {
    const user = req.user;
    if (!user) throw ForbiddenError('No user found');
    new CREATED({
      message: 'Automation is created',
      metadata: await AutomationService.createAutomation({ ...req.body, user })
    }).send(res);
  }

  static async deleteAutomation(req, res) {
    console.log('delete route');
    const id = req.params.id;
    new DELETED({
      message: 'Automation is deleted',
      metadata: await AutomationService.deleteAutomation(id)
    }).send(res);
  }

  static async updateAutomation(req, res) {
    const id = req.params.id;
    new OK({
      message: 'Automation is updated',
      metadata: await AutomationService.updateAutomation(id, req.body)
    }).send(res);
  }
}

module.exports = AutomationController;
