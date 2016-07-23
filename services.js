'use strict'
const invariant = require('invariant');
const R = require('ramda');

const Color = require('./snu').Color;
const Indicator = require('./snu').Indicator;

const AllServices = [
  HerokuService(),
  GithubService(),
  StatuspageIOService('aptible', 'Aptible',  'http://status.aptible.com'),
  StatuspageIOService('quay', 'Quay',  'http://status.quay.io'),
  StatuspageIOService('circleci', 'CircleCI',  'https://circleci.statuspage.io'),
  StatuspageIOService('vimeo', 'Vimeo',  'http://www.vimeostatus.com'),
  StatuspageIOService('travisci', 'TravisCI',  'https://www.traviscistatus.com'),
  StatuspageIOService('uservoice', 'UserVoice',  'https://status.uservoice.com'),
  StatuspageIOService('newrelic', 'New Relic',  'https://status.newrelic.com'),
  StatuspageIOService('bitbucket', 'Bitbucket',  'http://status.bitbucket.org'),
  StatuspageIOService('disqus', 'Disqus',  'https://status.disqus.com'),
  StatuspageIOService('kickstarter', 'Kickstarter',  'http://status.kickstarter.com'),
  StatuspageIOService('kmstatus', 'KMstatus',  'https://kmstatus.com'),
  StatuspageIOService('gotomeeting', 'Goto Meeting',  'http://status.gotomeeting.com'),
  StatuspageIOService('parse', 'Parse',  'https://status.parse.com'),
  StatuspageIOService('twilio', 'Twilio',  'https://status.twilio.com')
];

// data Key = String
// data URL = String
// data Label = String
// data Parser = JSON -> Indicator
// data Service = Key | Label | URL | Parser
function Service(key, label, url, parser) {
  invariant(key, 'Service needs valid key');
  invariant(label, 'Service needs valid label')
  invariant(url, 'Service needs valid url');
  invariant(parser, 'Service needs valid parser');

  return {
    'key': key,
    'url': url,
    'label': label,
    'parser': parser,
  }
}

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

  return Service(key, label, statusJSONURL, _parseJSON);
}


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


module.exports = {
  ALL: AllServices,
  StatuspageIOService: StatuspageIOService,
  GithubService: GithubService,
  HerokuService: HerokuService
}