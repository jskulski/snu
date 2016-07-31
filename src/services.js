'use strict'
const invariant = require('invariant');
const R = require('ramda');

const Color = require('./data').Color;
const Indicator = require('./data').Indicator;

const Service = require('./services/service');
const StatuspageIOService = require('./services/statuspageio');

const ShownByDefault = [
  HerokuService(),
  GithubService(),
  StatuspageIOService('quay', 'Quay',  'http://status.quay.io'),
  StatuspageIOService('aptible', 'Aptible',  'http://status.aptible.com'),
  StatuspageIOService('circleci', 'CircleCI',  'https://circleci.statuspage.io'),
  StatuspageIOService('newrelic', 'New Relic',  'https://status.newrelic.com'),
  StatuspageIOService('twilio', 'Twilio',  'https://status.twilio.com')
];
const HiddenByDefault = [
  StatuspageIOService('travisci', 'TravisCI',  'https://www.traviscistatus.com'),
  StatuspageIOService('vimeo', 'Vimeo',  'http://www.vimeostatus.com'),
  StatuspageIOService('kickstarter', 'Kickstarter',  'http://status.kickstarter.com'),
  StatuspageIOService('gotomeeting', 'Goto Meeting',  'http://status.gotomeeting.com'),
  StatuspageIOService('disqus', 'Disqus',  'https://status.disqus.com'),
  StatuspageIOService('parse', 'Parse',  'https://status.parse.com'),
  StatuspageIOService('bitbucket', 'Bitbucket',  'http://status.bitbucket.org'),
  StatuspageIOService('uservoice', 'UserVoice',  'https://status.uservoice.com'),
  StatuspageIOService('kmstatus', 'KMstatus',  'https://kmstatus.com'),
]

const AllServices = R.union(ShownByDefault, HiddenByDefault)


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
  ShownByDefault: ShownByDefault,
  HiddenByDefault: HiddenByDefault,
  Service: Service,
  StatuspageIOService: StatuspageIOService,
  GithubService: GithubService,
  HerokuService: HerokuService
}
