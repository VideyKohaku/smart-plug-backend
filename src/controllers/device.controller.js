const { CREATED, DELETED } = require('../core/success.response');
const DeviceService = require('../services/device.service');

class DeviceController {
  static async addDevice(req, res) {
    new CREATED({
      message: 'Add device successfully',
      metadata: await DeviceService.addDevice(req.body),
    }).send(res);
  }
}

module.exports = DeviceController;