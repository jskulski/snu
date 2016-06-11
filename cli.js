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
  function Service(key, url) {
    return {
      'key': key,
      'url': url
    }
  }

  const configKeyServiceMap = {
    'aptible': Service('aptible', 'http://status.aptible.com/index.json'),
    'quay': Service('quay', 'http://status.quay.io/index.json'),
    'circleci': Service('circleci', 'https://circleci.statuspage.io/index.json'),
    'vimeo': Service('vimeo', 'http://www.vimeostatus.com/index.json'),
    'travisci': Service('travisci', 'https://www.traviscistatus.com/index.json'),
    'uservoice': Service('uservoice', 'https://status.uservoice.com/index.json'),
    'hipchat': Service('hipchat', 'https://status.hipchat.com/index.json'),
    'newrelic': Service('newrelic', 'https://status.newrelic.com/index.json'),
    'bitbucket': Service('bitbucket', 'http://status.bitbucket.org/index.json'),
    'disqus': Service('disqus', 'https://status.disqus.com/index.json'),
    'kickstarter': Service('kickstarter', 'http://status.kickstarter.com/index.json'),
    'kmstatus': Service('kmstatus', 'https://kmstatus.com/index.json'),
    'gotomeeting': Service('gotomeeting', 'http://status.gotomeeting.com/index.json'),
    'parse': Service('parse', 'https://status.parse.com/index.json'),
    'twilio': Service('twilio', 'https://status.twilio.com/index.json')
  };

  const pickServices = R.compose(R.values, R.pick);

  var services;
  if (!config || config.length == 0) {
    services = R.values(configKeyServiceMap);
  }
  else {
    services = pickServices(config, configKeyServiceMap)
  }

  R.map(gatherReport, services);
}

go();
