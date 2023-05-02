const User = require('../models/user.model');
const Sensor = require('../models/sensor.model');
const { BadRequestError } = require('../core/error.reponse');
const pickFields = require('../utils/pickFields');
const { format } = require('morgan');
const { response } = require('express');
const adafruitService = require('./adafruit.service');

class SensorService {
  static async _format(sensor) {
    const fields = ['_id', 'name', 'user', 'type_sensor', 'value', 'topic'];
    return pickFields(sensor, fields);
  }

  static async _getCurrentData(sensor) {
    try {
      const data = await adafruitService.getLatestFeedData(sensor.topic);
      return data;
    } catch (err) {
      console.log(err.message);
      return 0;
    }
  }

  static async _getSensors(query) {
    const sensors = await Sensor.find(query);
    return await Promise.all(
      sensors.map(async (sensor) => {
        // console.log(device)
        const value = await SensorService._getCurrentData(sensor);
        return { ...sensor.toObject(), value };
      })
    );
  }

  static async _formatList(sensors) {
    return sensors.map((sensor) => {
      return SensorService._format(sensor);
    });
  }

  static async addSensor({ name, user, type_sensor, value, topic }) {
    if (!user) throw new BadRequestError('User does not exists');

    // check name duplicated
    const sensor = await Sensor.findOne({ name, user: user.id }).lean();
    if (sensor) throw new BadRequestError('Name is already existed');

    const [newSensor, adafruitRes] = await Promise.all([
      Sensor.create({
        name,
        value,
        topic,
        user: user.id,
        type_sensor
      }),
      adafruitService.createFeed(topic)
    ]);

    return SensorService._format(newSensor);
  }

  static async getAllSensors() {
    const sensors = await SensorService._getSensors({});
    const formatSensors = await Promise.all(
      await SensorService._formatList(sensors)
    );

    return {
      count: sensors.length,
      sensors: formatSensors
    };
  }

  static async getSensorsbyUser({ userId }) {
    // console.log(userId)
    const sensors = await SensorService._getSensors({ user: userId });
    const formatSensors = await Promise.all(
      await SensorService._formatList(sensors)
    );

    return {
      count: sensors.length,
      sensors: formatSensors
    };
  }
}

module.exports = SensorService;
