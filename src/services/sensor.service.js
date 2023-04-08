const User = require("../models/user.model");
const Sensor = require("../models/sensor.model");
const { BadRequestError } = require("../core/error.reponse");
const pickFields = require("../utils/pickFields");
const { format } = require("morgan");
const { response } = require("express");

class SensorService{
    static async _format(sensor){
        const fields = ["_id", "name", "user", "type_value", "type_sensor", "value"]; 
        return pickFields(sensor, fields);
    }

    static async _getSensors(query){
        const sensors = await Sensor.find(query).lean();
        return sensors
    }

    static async _formatList(sensors){    
        return sensors.map((sensor) => {
            return SensorService._format(sensor)
        });
    }

    static async addSensor({name, user, type_value, type_sensor, value}){
        // check User exist
        const isUserExist = await User.findOne({_id: user}).lean();
        if(!isUserExist){
            throw new BadRequestError('User Not Found');
        }

        // check name duplicated
        const sensor = await Sensor.findOne({name, user}).lean();
        if(sensor){
            throw new BadRequestError('Name is already existed');
        }

        const newDevice = await Sensor.create({name, user, type_value, type_sensor, value})  

        return SensorService._format(newDevice)
    }

    static async getAllSensors(){
        const sensors = await SensorService._getSensors({})
        const formatSensors = await Promise.all(await SensorService._formatList(sensors));

        return {
            count: sensors.length,
            sensors: formatSensors
        }
    }

    static async getSensorsbyUser({userId}){
        // console.log(userId)
        const sensors = await SensorService._getSensors({user: userId})
        const formatSensors = await Promise.all(await SensorService._formatList(sensors));

        return {
            count: sensors.length,
            sensors: formatSensors
        }
    }


}

module.exports = SensorService