const R = require('ramda');

const Service = require('./service');
const Color = require('../data').Color;
const Indicator = require('../data').Indicator;

// data GithubService = Service
function GithubService() {

  const key = 'github';
  const label = 'Github';
  const domain = 'https://status.github.com';
  const path = '/api/last-message.json';
  const url = domain + path;

  // _mapColor :: String -> Color
  function _mapColor(indicator) {
    const map = {
      'good': Color('green'),
      'minor': Color('yellow'),
      'major': Color('red'),
    }
    return map[indicator] ? map[indicator] : Color('black');
  }

  // parseJSON :: GithubJSON -> Indicator
  function _parseJSON(status) {
    const name = key;
    const parseColor = R.compose(_mapColor, R.prop('status'))
    const parseMessage = R.prop('body');
    return Indicator(name, label, parseColor(status), parseMessage(status), domain)
  }

  return Service(key, label, url, _parseJSON);
}

module.exports = GithubService