const Device = require('../models/device.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');
const adafruitService = require('./adafruit.service');

class DeviceService {
  static _format(device) {
    const fields = ['_id', 'name', 'user', 'state'];
    return pickFields(device, fields);
  }

  static async _getDevices(query) {
    const devices = await Device.find(query).lean();
    return devices;
  }

  static _formatList(devices) {
    return devices.map((device) => {
      return DeviceService._format(device);
    });
  }

  static async createDevice({ name, user, state, topic }) {
    if (!user) throw new BadRequestError('User does not exists');

    // check device name duplicated
    const device = await Device.findOne({ name, id: user.id }).lean();
    if (device) throw new BadRequestError('Name is already existed');

    const newDevice = await Device.create({
      name,
      state,
      topic,
      user: user.id
    });

    // Create topic in adafruit when created device
    const userGroup = user.email.split('@')[0];
    await adafruitService.createFeedInGroup(topic, userGroup);

    return DeviceService._format(newDevice);
  }

  static async getAllDevices() {
    const devices = await DeviceService._getDevices({});
    return {
      count: devices.length,
      devices: DeviceService._formatList(devices)
    };
  }

  static async getAllDevicesByUser({ userId }) {
    const devices = await DeviceService._getDevices({ user: userId });
    return {
      count: devices.length,
      devices: DeviceService._formatList(devices)
    };
  }

  static async getDevice({ deviceId }) {
    // check device exist
    const device = await Device.findOne({ _id: deviceId });
    if (!device) {
      throw new BadRequestError('Device Not Found');
    }

    return await DeviceService._format(device);
  }

  static async updateDevice({ deviceId }, update) {
    // check device exist
    const device = await Device.findOne({ _id: deviceId }).lean();
    if (!device) {
      throw new BadRequestError('Device Not Found');
    }

    const option = {
      new: true,
      lean: true
    };

    const newDevice = await Device.findByIdAndUpdate(deviceId, update, option);
    return DeviceService._format(newDevice);
  }

  static async removeDevice({ deviceId }) {
    // check device name exist
    const isDeviceExist = await Device.findOne({ _id: deviceId }).lean();
    if (!isDeviceExist) {
      throw new BadRequestError('Device Not Found');
    }

    return await Device.deleteOne({ _id: deviceId });
  }
}

module.exports = DeviceService;
