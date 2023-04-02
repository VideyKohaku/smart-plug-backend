const User = require("../models/user.model");
const Device = require("../models/device.model");
const { BadRequestError } = require("../core/error.reponse");

class DeviceService {
    static async addDevice({ name, user, state }) {
        // check user not found - temporally
        const isUserExist = await User.findOne({_id:user}).lean();
        if(!isUserExist){
            throw new BadRequestError('User Not Found');
        }

        // check device name duplicated
        const device = await Device.findOne({name, user}).lean();
        if(device){
            throw new BadRequestError('Name is already existed');
        }

        const newDevice = await Device.create({name, user, state});
        return newDevice;
    }

    static async getAllDevices() {
        const devices = await Device.find({})
        return {
            count: devices.length,
            devices
        }
    }

    static async getDevice({deviceId}){
        // check device exist
        const device = await Device.findOne({_id: deviceId}).lean();
        if(!device){
            throw new BadRequestError('Device Not Found');
        }

        return device;
    }

    static async updateDevice({deviceId}, update){
        // check device exist
        const device = await Device.findOne({_id: deviceId}).lean();
        if(!device){
            throw new BadRequestError('Device Not Found');
        }

        const option = {
            new: true,
            lean: true
        }

        const newDevice = Device.findByIdAndUpdate(deviceId, update, option);
        return newDevice;
    }

    static async removeDevice({deviceId}){
        // check device name exist
        const isDeviceExist = await Device.findOne({_id: deviceId}).lean();
        if(!isDeviceExist){
            throw new BadRequestError('Device Not Found');
        }

        return await Device.deleteOne({_id: deviceId});
    }
}

module.exports = DeviceService;
