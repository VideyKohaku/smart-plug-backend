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
        // console.log(req.params)
        new OK({
            message: "Sensors",
            metadata: await SensorService.getSensorsbyUser(req.params),
        }).send(res)
    }

    static async getSensor(req, res){
        console.log("sensor controller getOneByID:  ", req.params)
        new OK({
            message: "Sensor",
            metadata: await SensorService.getSensor(req.params)
        }).send(res)
    }

    static async updateSensor(req, res){
        console.log("Sensor Controller Update: ", req.params)
        new OK({
            message: "Sensor Updated",
            metadata: await SensorService.updateSensor(req.params, req.body)
        }).send(res)
    }

    static async deleteSensor(req, res){
        console.log("Sensor Controller: ", req.params)
        new OK({
            message: "Sensor Deleted",
            metadata: await SensorService.deleteSensor(req.params)
        }).send(res)
    }
}

module.exports = SensorController;