'use strict'
const R = require('ramda');
const fetch = require('node-fetch');
const invariant = require('invariant');
const chalk = require('chalk');

const gua = require('./gua');

// TODO: better name for indicator on our side?
function mapColor(indicator) {
  const map = {
    'none': gua.Color('green'),
    'minor': gua.Color('yellow'),
    'major': gua.Color('red'),
  }
  return map[indicator] ? map[indicator] : Color('black');
}

function parse(status) {
  const color = mapColor(status.status.indicator);
  return gua.Indicator(status.page.name, color);
}

function render(indicator) {
  if (indicator.color == gua.Color('green')) {
    console.log(chalk.green(indicator.key + ': OK'));
  }
  else {
    console.log(chalk.bold.red('vvvvvvv'))
    console.log(chalk.red(indicator.key, ': NOT OK'))
    console.log(chalk.bold.red('^^^^^^'))
  }
}


function report(url) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => parse(json))
    .then((indicator) => render(indicator));
}


function go(config) {
  const configKeyServiceMap = {
    'aptible': 'http://status.aptible.com/index.json',
    'quay': 'http://status.quay.io/index.json',
    'circleci': 'https://circleci.statuspage.io/index.json',
    'vimeo': 'http://www.vimeostatus.com/index.json',
    'travisci': 'https://www.traviscistatus.com/index.json',
    'uservoice': 'https://status.uservoice.com/index.json',
    'hipchat': 'https://status.hipchat.com/index.json',
    'newrelic': 'https://status.newrelic.com/index.json',
    'bitbucket': 'http://status.bitbucket.org/index.json',
    'disqus': 'https://status.disqus.com/index.json',
    'kickstarter': 'http://status.kickstarter.com/index.json',
    'kmstatus': 'https://kmstatus.com/index.json',
    'gotomeeting': 'http://status.gotomeeting.com/index.json',
    'parse': 'https://status.parse.com/index.json'
  };

  const pickServices = R.compose(R.values, R.pick);
  var services = pickServices(config, configKeyServiceMap)

  const DEBUG = false;
  if (DEBUG) {
    services = R.values(configKeyServiceMap);
  }

  R.map(report, services);
}

go(['aptible', 'quay', 'circleci']);