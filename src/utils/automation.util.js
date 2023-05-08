const moment = require('moment-timezone');
const { timezone: tzConfig } = require('../../src/configs/app.config');

function convertFromUserTimezoneToUTC(time, repeats) {
  const res = {};

  // Convert user-specified time to UTC Time (NOT tested for timezones other than Vietnam yet)
  const userTimezone = tzConfig.userTimezone;
  const userTimezoneDiff = tzConfig.userTimezoneDiff;

  const dateIsLower = parseInt(time.split(':')[0]) < userTimezoneDiff;

  const utcTime = moment.tz(time, 'HH:mm', userTimezone).utc();
  res['time'] = utcTime.format('HH:mm');

  // Handle when there are date diff
  inputRepeats = repeats.map((elem) => (dateIsLower ? elem - 1 : elem));

  // Remove duplicates from the "repeats" array
  const repeatsSet = new Set(inputRepeats);
  res['repeats'] = [...repeatsSet];

  return res;
}

function onAutomationTriggered(automation) {
  // TODO: loop over actions, send requests to adafruit server
  console.log('cron job fired!', automation);
}

module.exports = {
  convertFromUserTimezoneToUTC,
  onAutomationTriggered
};
