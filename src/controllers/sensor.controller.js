const { CREATED, DELETED, OK } = require('../core/success.response');
const SensorService = require('../services/sensor.service');

class SensorController {
  static async addSensor(req, res) {
    const user = req.user;
    new CREATED({
      message: 'Sensor Added',
      metadata: await SensorService.addSensor({ ...req.body, user })
    }).send(res);
  }

  static async getAllSensor(req, res) {
    new OK({
      message: 'Sensors',
      metadata: await SensorService.getAllSensors()
    }).send(res);
  }

  static async getAllSensorByUser(req, res) {
    const userId = req.user ? req.user.id : req.params.userId;
    new OK({
      message: 'Sensors',
      metadata: await SensorService.getSensorsbyUser({userId})
    }).send(res);
  }
}

module.exports = SensorController;
