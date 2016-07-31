const Service = require('./service');
const Color = require('../data').Color;
const Indicator = require('../data').Indicator;

// data HerokuService = Service
function HerokuService() {

  const key = 'heroku';
  const label = 'Heroku';
  const domain = 'https://status.heroku.com';
  const path = '/api/ui/availabilities';
  const url = domain + path;

  // _mapColor :: String -> Color
  function _mapColor(color) {
    const map = {
      'green': Color('green'),
    }
    return map[color] ? map[color] : Color('red');
  }

  // parseJSON :: StatusPageIOJSON -> Indicator
  function _parseJSON(status) {
    const color = _mapColor(status.data[0].attributes.color);
    const message = color == Color('green') ? 'OK' : 'Heroku is reporting issues.'
    return Indicator(key, label, color, message, domain);
  }

  return Service(key, label, url, _parseJSON);

}

module.exports = HerokuService;