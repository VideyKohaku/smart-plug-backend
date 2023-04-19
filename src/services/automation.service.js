const Automation = require('../models/automation.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');

class AutomationService {
  static async _format(automation) {
    const fields = ['_id', 'name', 'user', 'actions', 'time', 'repeat'];
    return pickFields(automation, fields);
  }

  static async _getAutomations(query) {
    const automations = await Automation.find(query).lean();
    return automations;
  }

  static async _formatList(automations) {
    return automations.map((automation) => {
      return AutomationService._format(automation);
    });
  }

  static async getAllAutomations({ user }) {
    const automations = await Automation.find({ user: user.id });
    return {
      count: automations.length,
      automations: AutomationService._formatList(automations)
    };
  }

  static async getAllAutomationsByUser({ userId }) {
    const automations = await AutomationService._getAutomations({
      user: userId
    });
    const formatAutomations = await Promise.all(
      await AutomationService._formatList(automations)
    );
    return {
      count: automations.length,
      automations: formatAutomations
    };
  }

  static async getAutomation(id) {
    const automation = await Automation.findById(id);
    console.log(automation);
    if (!automation) {
      throw new BadRequestError("Automation's ID not found");
    }

    return automation;
  }

  static async createAutomation({ name, user, actions, time, repeats }) {
    const automation = await Automation.create({
      name,
      user: user.id,
      actions,
      time,
      repeats
    });
    return AutomationService._format(automation);
  }

  static async deleteAutomation(id) {
    await Automation.findByIdAndDelete(id);
    return;
  }

  static async updateAutomation(id, data) {
    const automation = await Automation.findByIdAndUpdate(id, data, {
      new: true
    });
    return automation;
  }
}

module.exports = AutomationService;
