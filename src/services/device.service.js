const User = require('../models/user.model');
const Device = require('../models/device.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');

class DeviceService {
  static async _format(device) {
    const fields = ['_id', 'name', 'user', 'state'];
    return pickFields(device, fields);
  }

  static async _getDevices(query) {
    const devices = await Device.find(query).lean();
    return devices;
  }

  static async _formatList(devices) {
    return devices.map((device) => {
      return DeviceService._format(device);
    });
  }

  static async addDevice({ name, user, state }) {
    // check user not found - temporally
    const isUserExist = await User.findOne({ _id: user }).lean();
    if (!isUserExist) {
      throw new BadRequestError('User Not Found');
    }

    // check device name duplicated
    const device = await Device.findOne({ name, user }).lean();
    if (device) {
      throw new BadRequestError('Name is already existed');
    }

    const newDevice = await Device.create({ name, user, state });
    return newDevice;
  }

  static async getAllDevices() {
    const devices = await DeviceService._getDevices({});
    const formatDevices = await Promise.all(
      await DeviceService._formatList(devices)
    );
    return {
      count: devices.length,
      devices: formatDevices,
    };
  }

  static async getAllDevicesByUser({ userId }) {
    const devices = await DeviceService._getDevices({ user: userId });
    // console.log(devices)
    const formatDevices = await Promise.all(
      await DeviceService._formatList(devices)
    );
    return {
      count: devices.length,
      devices: formatDevices,
    };
  }

  static async getDevice({ deviceId }) {
    // check device exist
    const device = await Device.findOne({ _id: deviceId });
    if (!device) {
      throw new BadRequestError('Device Not Found');
    }

    return device;
  }

  static async updateDevice({ deviceId }, update) {
    // check device exist
    const device = await Device.findOne({ _id: deviceId }).lean();
    if (!device) {
      throw new BadRequestError('Device Not Found');
    }

    const option = {
      new: true,
      lean: true,
    };

    const newDevice = await Device.findByIdAndUpdate(deviceId, update, option);
    return newDevice;
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
