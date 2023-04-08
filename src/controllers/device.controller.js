const { CREATED, DELETED, OK } = require('../core/success.response');
const DeviceService = require('../services/device.service');

class DeviceController {
  static async createDevice(req, res) {
    new CREATED({
      message: 'Device Added',
      metadata: await DeviceService.createDevice({
        ...req.body,
        user: req.user
      })
    }).send(res);
  }

  static async getAllDevices(req, res) {
    new OK({
      message: 'Devices',
      metadata: await DeviceService.getAllDevices()
    }).send(res);
  }

  static async getDevice(req, res) {
    new OK({
      message: 'Device Found',
      metadata: await DeviceService.getDevice(req.params)
    }).send(res);
  }

  static async updateDevice(req, res) {
    new OK({
      message: 'Device Updated',
      metadata: await DeviceService.updateDevice(req.params, req.body)
    }).send(res);
  }

  static async removeDevice(req, res) {
    new DELETED({
      message: 'Device Removed',
      metadata: await DeviceService.removeDevice(req.params)
    }).send(res);
  }
}

module.exports = DeviceController;
