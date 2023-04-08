const User = require('../models/user.model');
const Device = require('../models/device.model');
const Scenario = require('../models/scenario.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');

class ScenarioService {
    static async _format(scenario) {
        const fields = ["_id", "name", "user", "type_value", "type_sensor", "value"];
        return pickFields(scenario, fields);
    }

    static async _getScenario(query) {
        const scenarios = await Scenario.find(query).lean();
        return scenarios
    }

    static async _formatList(scenarios) {
        return scenarios.map((scenario) => {
            return ScenarioService._format(scenario)
        });
    }

    static async addScenario({ name, user, actions }) {
        console.log('name: ', name, '\nuser: ', user, '\nactions: ', actions);
        // check user not found - temporally
        const isUserExist = await User.findOne({ _id: user }).lean();
        if (!isUserExist) {
            throw new BadRequestError('User Not Found');
        }

        // check scenario name duplicated
        const isScenarioExist = await Scenario.findOne({ name, user }).lean();
        if (isScenarioExist) {
            throw new BadRequestError('Name is already existed');
        }

        const { id } = await Scenario.create({
            name,
            user,
            actions,
        });
        return { name, user, actions, id };
    }

    static async getAllScenarios() {
        const scenarios = await ScenarioService._getScenario({})
        const formatScenarios = await Promise.all(await ScenarioService._formatList(scenarios));

        return{
            count: scenarios.length,
            scenarios: formatScenarios
        }
    }

    static async getAllScenariosByUser({userId}) {
        const scenarios = await ScenarioService._getScenario({user: userId})
        const formatScenarios = await Promise.all(await ScenarioService._formatList(scenarios));

        return{
            count: scenarios.length,
            scenarios: formatScenarios
        }
    }

    static async getScenario({ sceneId }) {
        // check scene exist
        const scenario = await Scenario.findOne({ _id: sceneId });
        if (!scenario) {
            throw new BadRequestError('Scenario not Exist');
        }

        return pickFields(scenario, ['name', 'user', 'actions', 'id']);
    }

    static async updateScenario({ sceneId }, update) {
        console.log(sceneId);
        // check scene exist
        const scenario = await Scenario.findById(sceneId).lean();
        console.log(sceneId);
        if (!scenario) {
            throw new BadRequestError('Scenario not Found');
        }

        const option = {
            new: true,
            lean: true,
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
}

module.exports = ScenarioService;
