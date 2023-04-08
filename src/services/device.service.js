const Device = require('../models/device.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');
const adafruitService = require('./adafruit.service');

class DeviceService {
  static async format(device) {
    const fields = ['name', 'user', 'state', 'topic'];
    return pickFields(device, fields);
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

    return DeviceService.format(newDevice);
  }

  async getAllDevices() {
    const devices = await Device.find({});
    return {
      count: devices.length,
      devices: devices.map((device) => DeviceService.format(device))
    };
  }

  static async getDevice({ deviceId }) {
    // check device exist
    const device = await Device.findOne({ _id: deviceId });
    if (!device) {
      throw new BadRequestError('Device Not Found');
    }

    // console.log(device.user.group)
    return DeviceService.format(device);
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
    return DeviceService.format(newDevice);
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
