const { CREATED, DELETED, OK } = require('../core/success.response');
const SensorService = require("../services/sensor.service");

class SensorController{
    static async addSensor(req,res){
        new CREATED({
            message: "Sensor Added",
            metadata: await SensorService.addSensor(req.body),
        }).send(res)
    }

    static async getAllSensor(req, res){
        new OK({
            message: "Sensors",
            metadata: await SensorService.getAllSensors(),
        }).send(res)
    }

    static async getAllSensorByUser(req, res){
        new OK({
            message: "Sensors",
            metadata: await SensorService.getSensorsbyUser(req.params),
        }).send(res)
    }
}

module.exports = SensorController;