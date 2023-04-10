const User = require("../models/user.model");
const Sensor = require("../models/sensor.model");
const { BadRequestError } = require("../core/error.reponse");
const pickFields = require("../utils/pickFields");
const { format } = require("morgan");
const { response } = require("express");

class SensorService {
    static async _format(sensor) {
        const fields = ["_id", "name", "user", "type_value", "type_sensor", "value"];
        return pickFields(sensor, fields);
    }

    static async _getSensors(query) {
        const sensors = await Sensor.find(query).lean();
        return sensors
    }

    static async _formatList(sensors) {
        return sensors.map((sensor) => {
            return SensorService._format(sensor)
        });
    }

    static async addSensor({ name, user, type_value, type_sensor, value }) {
        // check User exist
        const isUserExist = await User.findOne({ _id: user }).lean();
        if (!isUserExist) {
            throw new BadRequestError('User Not Found');
        }

        // check name duplicated
        const sensor = await Sensor.findOne({ name, user }).lean();
        if (sensor) {
            throw new BadRequestError('Name is already existed');
        }

        const newDevice = await Sensor.create({ name, user, type_value, type_sensor, value })

        return SensorService._format(newDevice)
    }

    static async getAllSensors() {
        const sensors = await SensorService._getSensors({})
        const formatSensors = await Promise.all(await SensorService._formatList(sensors));

        return {
            count: sensors.length,
            sensors: formatSensors
        }
    }

    static async getSensorsbyUser({ userId }) {
        // console.log(userId)
        const sensors = await SensorService._getSensors({ user: userId })
        const formatSensors = await Promise.all(await SensorService._formatList(sensors));

        return {
            count: sensors.length,
            sensors: formatSensors
        }
    }

    static async getSensor({ sensorId }) {
        const sensor = await SensorService._getSensors({ _id: sensorId });
        if (!sensor) {
            throw new BadRequestError("Sensor Not Found")
        }
        console.log("service: ", sensor)
        const formatSensor = await SensorService._format(sensor[0]);
        console.log("service: ", formatSensor)
        return formatSensor;
    }

    static async updateSensor({ sensorId }, update) {
        console.log("sensor Service: ", sensorId);
        // check sensor exists
        const sensor = await SensorService._getSensors({ _id: sensorId})
        if(!sensor){
            throw new BadRequestError("Sensor Not Found")
        }

        const option = {
            new: true,
            lean: true,
        };

        const newSensor = await Sensor.findByIdAndUpdate(sensorId, update, option);
        return await SensorService._format(newSensor);
    }

    static async deleteSensor({sensorId}){
        // check sensor exist
        const isSensorExist = await SensorService._getSensors({_id: sensorId});
        if(!isSensorExist){
            throw new BadRequestError("Sensor Not Found");
        }

        return await Sensor.deleteOne({_id: sensorId});
    }
}

module.exports = SensorService