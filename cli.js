#!/usr/bin/env node
'use strict'
const R = require('ramda');
const fetch = require('node-fetch');
const invariant = require('invariant');
const chalk = require('chalk');

const snu = require('./snu');

// TODO: better name for indicator on our side?
function mapColor(indicator) {
  const map = {
    'none': snu.Color('green'),
    'minor': snu.Color('yellow'),
    'major': snu.Color('red'),
  }
  return map[indicator] ? map[indicator] : Color('black');
}

// parseJSON :: StatusPageIOJSON -> Indicator
function parseJSON(status) {
  const color = mapColor(status.status.indicator);
  return snu.Indicator(status.page.name, color);
}

// data Parser = Promise -> Indicator
// data URL String
// data Service = String | URL | Parser
function Service(key, url, parser) {
  return {
    'key': key,
    'url': url,
    'parseJSON': parseJSON
  }
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
    console.log('indicator: ', indicator)
    console.log(chalk.bold.red('^^^^^^'));
  }
}

// gatherReport :: Renderer -> Service -> Indicator (Side effect)
function gatherReport(renderer, service) {
  // console.log('renderer', renderer);
  // console.log('service', service)
  fetch(service.url)
    .then((resp) => resp.json()) // TODO: pass promise around to allow other methods than JSON?
    .then(service.parseJSON)
    // .then(t => console.log('test', t))
    .then(renderer)
    .catch((error) => console.log('error fetching '+ service.key +': ' + error));
}


function go(config) {

  const allServices = [
    Service('aptible', 'http://status.aptible.com/index.json'),
    Service('quay', 'http://status.quay.io/index.json'),
    Service('circleci', 'https://circleci.statuspage.io/index.json'),
    Service('vimeo', 'http://www.vimeostatus.com/index.json'),
    Service('travisci', 'https://www.traviscistatus.com/index.json'),
    Service('uservoice', 'https://status.uservoice.com/index.json'),
    Service('hipchat', 'https://status.hipchat.com/index.json'),
    Service('newrelic', 'https://status.newrelic.com/index.json'),
    Service('bitbucket', 'http://status.bitbucket.org/index.json'),
    Service('disqus', 'https://status.disqus.com/index.json'),
    Service('kickstarter', 'http://status.kickstarter.com/index.json'),
    Service('kmstatus', 'https://kmstatus.com/index.json'),
    Service('gotomeeting', 'http://status.gotomeeting.com/index.json'),
    Service('parse', 'https://status.parse.com/index.json'),
    Service('twilio', 'https://status.twilio.com/index.json')
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
