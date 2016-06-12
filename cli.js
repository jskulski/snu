#!/usr/bin/env node
'use strict'
const R = require('ramda');
const fetch = require('node-fetch');
const invariant = require('invariant');
const chalk = require('chalk');

const snu = require('./snu');

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
      'good': snu.Color('green'),
      'minor': snu.Color('yellow'),
      'major': snu.Color('red'),
    }
    return map[indicator] ? map[indicator] : Color('black');
  }

  // parseJSON :: GithubJSON -> Indicator
  function _parseJSON(status) {
    const parseColor = R.compose(_mapColor, R.prop('status'), R.head)
    return snu.Indicator('Github', parseColor(status))
  }

  return Service(key, url, _parseJSON);
}

// data StatuspageIOService = Key | Url
function StatuspageIOService(key, url) {
  // TODO: better name for indicator on our side?
  function _mapColor(indicator) {
    const map = {
      'none': snu.Color('green'),
      'minor': snu.Color('yellow'),
      'major': snu.Color('red'),
    }
    return map[indicator] ? map[indicator] : Color('black');
  }

  // parseJSON :: StatusPageIOJSON -> Indicator
  function _parseJSON(status) {
    const color = _mapColor(status.status.indicator);
    return snu.Indicator(status.page.name, color);
  }

  return Service(key, url, _parseJSON);

}

// renderToConsole :: Indicator -> ConsoleIO (Side effect)
function renderToConsole(indicator) {
  // console.log('renderToConsole: ', indicator);
  if (indicator.color == snu.Color('green')) {
    console.log(chalk.green(indicator.key + ': OK'));
  }
  else {
    console.log(chalk.bold.red('vvvvvvv'));
    console.log(chalk.red(indicator.key, ': NOT OK'));
    console.log(chalk.bold.red('^^^^^^'));
  }
}

// gatherReport :: Renderer -> Service -> Indicator (Side effect)
function gatherReport(renderer, service) {
  fetch(service.url)
    .then((resp) => resp.json()) // TODO: pass promise around to allow other methods than JSON?
    .then(service.parser)
    .then(renderer)
    .catch((error) => console.log('error fetching '+ service.key +': ' + error));
}


function go(config) {

  const allServices = [
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

  var requestedServices;
  if (!config || config.length == 0) {
    requestedServices = R.values(allServices);
  }
  else {
    const inConfig = (svc) => R.contains(svc.key, config),
    requestedServices = R.filter(inConfig, allServices);
  }

  const renderReport = R.curry(gatherReport)(renderToConsole);
  R.map(renderReport, requestedServices)
}

go([]);
