const { CREATED, DELETED, OK } = require('../core/success.response');
const SensorService = require("../services/sensor.service");

class SensorController{
    static async addSensor(req,res){
        new CREATED({
            message: "Sensor Added",
            metadata: await SensorService.addSensor(req.body),
        }).send(res)
    }
}

module.exports = SensorController;