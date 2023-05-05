const User = require('../models/user.model');
const Device = require('../models/device.model');
const Scenario = require('../models/scenario.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');
const adafruitService = require('../services/adafruit.service');

class ScenarioService {
  static async _format(scenario) {
    const fields = ['_id', 'name', 'user', 'actions', 'isFavorite'];
    return pickFields(scenario, fields);
  }

  static async _getScenario(query) {
    const scenarios = await Scenario.find(query).populate({
      path:"actions",
      populate: {
        path: "device",
        select: "name topic _id"
      }
    });
    return scenarios;
  }

  static async _formatList(scenarios) {
    return scenarios.map((scenario) => {
      return ScenarioService._format(scenario);
    });
  }

  static async createScenario({ name, user, actions, isFavorite = false }) {
    // check scenario name duplicated
    const isScenarioExist = await Scenario.findOne({
      name,
      user: user.id
    }).lean();
    if (isScenarioExist) {
      throw new BadRequestError('Name is already existed');
    }

    const scenario = await Scenario.create({
      name,
      user: user.id,
      actions,
      isFavorite
    });
    return ScenarioService._format(scenario);
  }

  static async getAllScenarios() {
    const scenarios = await ScenarioService._getScenario({});
    const formatScenarios = await Promise.all(
      await ScenarioService._formatList(scenarios)
    );

    return {
      count: scenarios.length,
      scenarios: formatScenarios
    };
  }

  static async getAllScenariosByUser({ userId }) {
    const scenarios = await ScenarioService._getScenario({ user: userId });
    const formatScenarios = await Promise.all(
      await ScenarioService._formatList(scenarios)
    );

    return {
      count: scenarios.length,
      scenarios: formatScenarios
    };
  }

  static async getScenario({ sceneId }) {
    // check scene exist
    const scenario = await Scenario.findOne({ _id: sceneId }).populate({
      path: 'actions',
      populate: { path: 'device', select: 'name topic _id' }
    });
    if (!scenario) {
      throw new BadRequestError('Scenario not Exist');
    }

    return await ScenarioService._format(scenario);
  }

  static async updateScenario({ sceneId }, update) {
    const scenario = await Scenario.findById(sceneId).lean();
    console.log(sceneId);
    if (!scenario) {
      throw new BadRequestError('Scenario not Found');
    }

    const option = {
      new: true,
      lean: true
    };

    const newScenario = await Scenario.findByIdAndUpdate(
      { _id: sceneId },
      update,
      option
    );
    return pickFields(newScenario, ['name', 'user', 'actions', 'id']);
  }

  static async deleteScenario({ sceneId }) {
    // check scene exist
    const scenario = await Scenario.findById(sceneId).lean();
    console.log(sceneId);
    if (!scenario) {
      throw new BadRequestError('Scenario not Found');
    }

    return await Scenario.deleteOne({ _id: sceneId });
  }

  static async activateScenario({sceneId}){
    const scenario = await ScenarioService.getScenario({sceneId});
    
    try{
      await Promise.all(scenario.actions.map(({device, state})=>{
          return adafruitService.sendData(device.topic, state? "1": "0");
      }))
    }catch (error){
      throw new BadRequestError("Activate scenario failed");
    }
  }
}

module.exports = ScenarioService;
