const axios = require('axios');
const { adafruit } = require('../configs/app.config');

class AdafruitService {
  static username = adafruit.username || 'datdev2409';
  static axiosInstance = axios.create({
    baseURL: 'https://io.adafruit.com',
    headers: { 'X-AIO-Key': adafruit.api_key },
  });

  static async sendData(feed_key, value) {
    const { username, axiosInstance } = AdafruitService;
    const endpoint = `/api/v2/${username}/feeds/${feed_key}/data`;
    axiosInstance.post(endpoint, { value });
  }

  static async getLatestData(feed_key) {
    const { username, axiosInstance } = AdafruitService;
    const endpoint = `/api/v2/${username}/feeds/${feed_key}/data/last`;
    const res = await axiosInstance.get(endpoint);
    console.log(res.data)
  }

  static async createFeed(feed_key) {
    const { username, axiosInstance } = AdafruitService;
    const endpoint = `/api/v2/${username}/feeds`;
    try {
      const res = await axiosInstance.post(endpoint, {
        feed: { name: feed_key },
      });
      console.log(res.data);
      console.log('Adafruit::' + res.data);
    } catch (error) {
      const errors = error.response.data.error;
      if (errors.includes('Name must be unique within the selected group')) {
        console.log(`${feed_key} is created`);
        return;
      } else {
        console.log(errors);
      }
    }
  }

  // Create group
  static async createGroup(group_name) {
    const { username, axiosInstance } = AdafruitService;
    const isGroupExist = await AdafruitService.getGroup(group_name);
    if (!isGroupExist) {
      const endpoint = `/api/v2/${username}/groups`;
      await axiosInstance.post(endpoint, { group: { name: group_name } });
    }
  }

  // Get group
  static async getGroup(group_name) {
    const { username, axiosInstance } = AdafruitService;
    const endpoint = `/api/v2/${username}/groups/${group_name}`;
    try {
      const res = await axiosInstance.get(endpoint);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  static async getFeedsInGroup(group_key) {
    const { username, axiosInstance } = AdafruitService;
    const endpoint = `/api/v2/${username}/groups/${group_key}/feeds`;
    try {
      const res = await axiosInstance.get(endpoint);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  static async createFeedInGroup(feed_key, group_key) {
    const { username, axiosInstance } = AdafruitService;
    const endpoint = `/api/v2/${username}/groups/${group_key}/feeds`;

    const isGroupExist = await AdafruitService.getGroup(group_key);
    if (!isGroupExist) {
      await AdafruitService.createGroup(group_key);
    }

    const feeds = await AdafruitService.getFeedsInGroup(group_key);
    const isFeedExists = feeds.includes(feed_key);
    if (isFeedExists) return true;

    try {
      const res = await axiosInstance.post(endpoint, {
        feed: { name: feed_key },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = AdafruitService;
