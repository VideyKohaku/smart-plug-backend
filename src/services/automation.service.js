const { BadRequestError } = require('../core/error.reponse');
const Automation = require('../models/automation.model');

class AutomationService {
  static async getAllAutomations() {
    const automations = await Automation.find({});
    return {
      count: automations.length,
      automations,
    };
  }

  static async getAutomation(id) {
    const automation = await Automation.findById(id);
    console.log(automation)
    if (!automation) {
      throw new BadRequestError("Automation's ID not found");
    }

    return automation;
  }

  static async createAutomation({ name, user, actions, time, repeats }) {
    console.log(name, user, actions)
    const automation = await Automation.create({
      name,
      user,
      actions,
      time,
      repeats,
    });
    return automation;
  }

  static async deleteAutomation(id) {
    await Automation.findByIdAndDelete(id)
    return;
  }

  static async updateAutomation(id, data) {
    const automation = await Automation.findByIdAndUpdate(id, data, {
      new: true,
    });
    return automation;
  }
}

module.exports = AutomationService
