const User = require("../models/user.model");
const Sensor = require("../models/sensor.model");
const { BadRequestError } = require("../core/error.reponse");
const pickFields = require("../utils/pickFields");

class SensorService{
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

        return pickFields(newDevice, ["id", "name", "user", "type_value", "type_sensor", "value"])
    }
}

module.exports = SensorService