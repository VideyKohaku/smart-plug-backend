const axios = require('axios');
const { adafruit } = require('../configs/app.config');

class AdafruitService {
  constructor(username, api_key) {
    this.username = username;
    this.instance = axios.create({
      baseURL: 'https://io.adafruit.com',
      headers: { 'X-AIO-Key': api_key }
    });
  }

  async getGroup(group_name) {
    const endpoint = `/api/v2/${this.username}/groups/${group_name}`;
    try {
      const res = await this.instance.get(endpoint);
      return res.data;
    } catch (error) {
      return false;
    }
  }

  async createGroup(group_name) {
    const isGroupExist = await this.getGroup(group_name);
    if (isGroupExist) return;

    const endpoint = `/api/v2/${this.username}/groups`;
    await this.instance.post(endpoint, { group: { name: group_name } });
  }

  async createFeedInGroup(feed_name, group_name) {
    // Create in case group does not exists
    await this.createGroup(group_name);

    const endpoint = `/api/v2/${this.username}/groups/${group_name}/feeds`;
    await this.instance.post(endpoint, { feed: { name: feed_name } });
  }

  async createFeed(feed_name) {
    const endpoint = `/api/v2/${this.username}/feeds`;
    await this.instance.post(endpoint, {
      feed: { name: feed_name }
    });
  }

  async getLatestFeedData(feed_name) {
    const endpoint = `/api/v2/${this.username}/feeds/${feed_name}/data/last`;
    const res = await this.instance.get(endpoint);
    return res.data.value;
  }

  async sendData(feed_name, data) {
    const endpoint = `/api/v2/${this.username}/feeds/${feed_name}/data`;
    try {
      const res = await this.instance.post(endpoint, {
        value: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  
}

const adafruitService = new AdafruitService(
  adafruit.username,
  adafruit.api_key
);

module.exports = adafruitService;
