const User = require("../models/user.model");
const Device = require("../models/device.model");
const Scenario = require("../models/scenario.model")
const { BadRequestError } = require("../core/error.reponse");

class ScenarioService {
    static async addScenario({ name, user, actions }) {
        console.log("name: ", name, "\nuser: ", user, "\nactions: ", actions)
        // check user not found - temporally
        const isUserExist = await User.findOne({ _id: user }).lean();
        if (!isUserExist) {
            throw new BadRequestError('User Not Found');
        }

        // check scenario name duplicated
        const isScenarioExist = await Scenario.findOne({ name, user }).lean();
        if (isScenarioExist) {
            throw new BadRequestError("Name is already existed");
        }

        const newScenario = await Scenario.create({ name, user, actions });
        return newScenario;
    }

    static async getAllScenarios() {
        const scenarios = await Scenario.find({})
        return {
            count: scenarios.length,
            scenarios
        }
    }

    static async getScenario({ sceneId }) {
        // check scene exist
        const scenario = await Scenario.findOne({ _id: sceneId }).lean();
        if (!scenario) {
            throw new BadRequestError("Scenario not Exist");
        }

        return scenario;
    }

    static async updateScenario({ sceneId }, update) {
        console.log(sceneId)
        // check scene exist
        const scenario = await Scenario.findById(sceneId).lean();
        console.log(sceneId);
        if (!scenario) {
            throw new BadRequestError("Scenario not Found");
        }

        const option = {
            new: true,
            lean: true,
        }

        const newScenario = await Scenario.findByIdAndUpdate({_id: sceneId}, update, option);
        return newScenario;
    }


    static async deleteScenario({ sceneId }) {
        // check scene exist
        const scenario = await Scenario.findById(sceneId).lean();
        console.log(sceneId);
        if (!scenario) {
            throw new BadRequestError("Scenario not Found");
        }

        return await Scenario.deleteOne({ _id: sceneId });
    }
}

module.exports = ScenarioService;
