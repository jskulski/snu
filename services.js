'use strict'
const invariant = require('invariant');
const R = require('ramda');

const Color = require('./snu').Color;
const Indicator = require('./snu').Indicator;

const AllServices = [
  GithubService('github', 'https://status.github.com/api/messages.json'),
  StatuspageIOService('aptible', 'http://status.aptible.com/index.json'),
  StatuspageIOService('quay', 'http://status.quay.io/index.json'),
  StatuspageIOService('circleci', 'https://circleci.statuspage.io/index.json'),
  StatuspageIOService('vimeo', 'http://www.vimeostatus.com/index.json'),
  StatuspageIOService('travisci', 'https://www.traviscistatus.com/index.json'),
  StatuspageIOService('uservoice', 'https://status.uservoice.com/index.json'),
  StatuspageIOService('hipchat', 'https://status.hipchat.com/index.json'),
  StatuspageIOService('newrelic', 'https://status.newrelic.com/index.json'),
  StatuspageIOService('bitbucket', 'http://status.bitbucket.org/index.json'),
  StatuspageIOService('disqus', 'https://status.disqus.com/index.json'),
  StatuspageIOService('kickstarter', 'http://status.kickstarter.com/index.json'),
  StatuspageIOService('kmstatus', 'https://kmstatus.com/index.json'),
  StatuspageIOService('gotomeeting', 'http://status.gotomeeting.com/index.json'),
  StatuspageIOService('parse', 'https://status.parse.com/index.json'),
  StatuspageIOService('twilio', 'https://status.twilio.com/index.json')
];

// data Key = String
// data URL = String
// data Parser = JSON -> Indicator
// data Service = Key | URL | Parser
function Service(key, url, parser) {
  invariant(key, 'Service needs valid key');
  invariant(url, 'Service needs valid url');
  invariant(parser, 'Service needs valid parser');

  return {
    'key': key,
    'url': url,
    'parser': parser
  }
}

// data GithubService = Key | Url
function GithubService(key, url) {
  // TODO: better name for indicator on our side?
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
    const parseColor = R.compose(_mapColor, R.prop('status'), R.head)
    return Indicator('Github', parseColor(status))
  }

  return Service(key, url, _parseJSON);
}

// data StatuspageIOService = Key | Url
function StatuspageIOService(key, url) {
  // TODO: better name for indicator on our side?
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
    return Indicator(status.page.name, color);
  }

  return Service(key, url, _parseJSON);

}

module.exports = {
  ALL: AllServices
}