const User = require("../models/user.model");
const Device = require("../models/device.model");
const { BadRequestError } = require("../core/error.reponse");

class DeviceService {
    static async addDevice({ name, user, state }) {
        //check device name
        const device = await Device.findOne({name, user}).lean();
        if(device){
            throw new BadRequestError('Name is already existed')
        }

        const newDevice = await Device.create({name, user, state})
        return newDevice
    }
}

module.exports = DeviceService;
