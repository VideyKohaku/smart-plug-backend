const { CREATED, DELETED, OK } = require('../core/success.response');
const DeviceService = require('../services/device.service');

class DeviceController {
  static async addDevice(req, res) {
    new CREATED({
      message: 'Add device successfully',
      metadata: await DeviceService.addDevice(req.body),
    }).send(res);
  }

  static async getDevice(req, res){
    new OK({
      message: 'Device found',
      metadata: await DeviceService.getDevice(req.params)
    }).send(res);
  }

  static async removeDevice(req, res){
    new DELETED({
      message: 'Remove device successfully',
      metadata: await DeviceService.removeDevice(req.params),
    }).send(res);
  }
}

module.exports = DeviceController;