'use strict'
const invariant = require('invariant');
const R = require('ramda');

const Color = require('./snu').Color;
const Indicator = require('./snu').Indicator;

const AllServices = [
  GithubService('github', 'https://status.github.com/api/messages.json'),
  StatuspageIOService('aptible', 'Aptible',  'http://status.aptible.com/index.json'),
  StatuspageIOService('quay', 'Quay',  'http://status.quay.io/index.json'),
  StatuspageIOService('circleci', 'CircleCI',  'https://circleci.statuspage.io/index.json'),
  StatuspageIOService('vimeo', 'Vimeo',  'http://www.vimeostatus.com/index.json'),
  StatuspageIOService('travisci', 'TravisCI',  'https://www.traviscistatus.com/index.json'),
  StatuspageIOService('uservoice', 'UserVoice',  'https://status.uservoice.com/index.json'),
  StatuspageIOService('hipchat', 'HipChat',  'https://status.hipchat.com/index.json'),
  StatuspageIOService('newrelic', 'New Relic',  'https://status.newrelic.com/index.json'),
  StatuspageIOService('bitbucket', 'Bitbucket',  'http://status.bitbucket.org/index.json'),
  StatuspageIOService('disqus', 'Disqus',  'https://status.disqus.com/index.json'),
  StatuspageIOService('kickstarter', 'Kickstarter',  'http://status.kickstarter.com/index.json'),
  StatuspageIOService('kmstatus', 'KMstatus',  'https://kmstatus.com/index.json'),
  StatuspageIOService('gotomeeting', 'Goto Meeting',  'http://status.gotomeeting.com/index.json'),
  StatuspageIOService('parse', 'Parse',  'https://status.parse.com/index.json'),
  StatuspageIOService('twilio', 'Twilio',  'https://status.twilio.com/index.json')
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
function GithubService(key, url) {

  const label = 'Github';

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
    const parseColor = R.compose(_mapColor, R.prop('status'), R.head)
    return Indicator(name, label, parseColor(status))
  }

  return Service(key, label, url, _parseJSON);
}

// data StatuspageIOService = Service
function StatuspageIOService(key, label, url) {

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
    const color = _mapColor(status.status.indicator);
    const name = key;
    return Indicator(name, label, color);
  }

  return Service(key, label, url, _parseJSON);
}

module.exports = {
  ALL: AllServices,
  StatuspageIOService: StatuspageIOService,
  GithubService: GithubService
}