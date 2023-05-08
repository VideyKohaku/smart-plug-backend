const Automation = require('../models/automation.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');
const { default: mongoose } = require('mongoose');
const schedule = require('node-schedule');
const automationUtils = require('../utils/automation.util');

class AutomationService {
  static _format(automation) {
    // const fields = ['_id', 'name', 'user', 'actions', 'time', 'repeat'];
    const fields = ['_id', 'name'];
    return pickFields(automation, fields);
  }

  static async _getAutomations(query) {
    const automations = await Automation.find(query).lean();
    return automations;
  }

  static _formatList(automations) {
    const formated = automations.map((automation) => {
      return AutomationService._format(automation);
    });
    console.log(formated);
    return formated;
  }

  static async getAllAutomations({ user }) {
    const automations = await Automation.find({ user: user.id });
    console.log(automations);
    return {
      count: automations.length,
      automations: AutomationService._formatList(automations)
      // automations: automations
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
    const automation = await Automation.findById(id).populate({
      path: 'actions',
      populate: { path: 'device', select: 'name topic _id' }
    });
    if (!automation) {
      throw new BadRequestError("Automation's ID not found");
    }

    return automation;
  }

  static async createAutomation({ name, user, actions, time, repeats }) {
    try {
      const automation = await Automation.create({
        name,
        user: user.id,
        actions,
        time,
        repeats
      });

      // Schedule cron jobs
      const cronSchedule = `0 ${automation.time.split(':')[1]} ${
        automation.time.split(':')[0]
      } * * ${automation.repeats.join(',')}`;

      schedule.scheduleJob(
        cronSchedule,
        automationUtils.onAutomationTriggered.bind(null, automation)
      );

      console.log(
        `Cron job scheduled for automation "${automation.name}" (${automation.user}):`
      );

      return AutomationService._format(automation);
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError(
          Object.values(err.errors)
            .map((val) => val.message)
            .join('; ')
        );
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        const keyPattern = Object.keys(err.keyPattern);
        const key = keyPattern[0];
        throw new BadRequestError(`${key} already taken!`);
      } else {
        throw new BadRequestError();
      }
    }
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

  static async scheduleAllAutomations() {
    // find all automations from the database
    try {
      const automations = await Automation.find({});

      console.log(`Scheduling ${automations.length} persisted automations...`);

      // iterate over all automations
      automations.forEach((automation) => {
        // construct the cron schedule for this automation
        const cronSchedule = `0 ${automation.time.split(':')[1]} ${
          automation.time.split(':')[0]
        } * * ${automation.repeats.join(',')}`;

        // schedule the cron job
        schedule.scheduleJob(
          cronSchedule,
          automationUtils.onAutomationTriggered.bind(null, automation)
        );
      });
    } catch (err) {
      console.error(err);
      return;
    }
  }
}

module.exports = AutomationService;
