const Service = require('./service');
const Color = require('../data').Color;
const Indicator = require('../data').Indicator;

// data StatuspageIOService = Service
function StatuspageIOService(key, label, domain) {

  const statusJSONURL = domain + '/index.json';

  // _mapColor :: String -> Color
  function _mapColor(indicator) {
    const map = {
      'none': Color('green'),
      'minor': Color('yellow'),
      'major': Color('red'),
    }
    return map[indicator] ? map[indicator] : Color('black');
  }

  // parseJSON :: StatusPageIOJSON -> Indicator
  function _parseJSON(status) {
    const name = key;
    const color = _mapColor(status.status.indicator);
    const message = status.status.description;
    return Indicator(name, label, color, message, domain);
  }

  // parse :: Promise Response -> Indicator
  function parse(response) {
    return response.json().then(_parseJSON)
  }

  return Service(key, label, statusJSONURL, parse);
}

module.exports = StatuspageIOService
