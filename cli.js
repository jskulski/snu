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

function parse(status) {
  const color = mapColor(status.status.indicator);
  return snu.Indicator(status.page.name, color);
}

function render(indicator) {
  if (indicator.color == snu.Color('green')) {
    console.log(chalk.green(indicator.key + ': OK'));
  }
  else {
    console.log(chalk.bold.red('vvvvvvv'))
    console.log(chalk.red(indicator.key, ': NOT OK'))
    console.log(chalk.bold.red('^^^^^^'))
  }
}


// gatherReport = Service -> Indicator
function gatherReport(service) {
  fetch(service.url)
    .then((res) => res.json())
    .then((json) => parse(json))
    .then((indicator) => render(indicator))
    .catch((error) => console.log('error fetching '+ service.key +': ' + error));
}


function go(config) {

  // data URL String
  // data Service = String | URL
  function Service(key, url) {
    return {
      'key': key,
      'url': url
    }
  }

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

  R.map(gatherReport, requestedServices);
}

go([]);
