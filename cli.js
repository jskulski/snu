#!/usr/bin/env node
'use strict'
const R = require('ramda');
const fetch = require('node-fetch');
const chalk = require('chalk');

const Color = require('./snu').Color;
const Services = require('./services');


// renderToConsole :: Indicator -> ConsoleIO (Side effect)
function renderToConsole(indicator) {
  // console.log('renderToConsole: ', indicator);
  if (indicator.color == Color('green')) {
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
  var requestedServices;
  if (!config || config.length == 0) {
    requestedServices = Services.ALL;
  }
  else {
    const inConfig = (svc) => R.contains(svc.key, config),
    requestedServices = R.filter(inConfig, Services.ALL);
  }

  const renderReport = R.curry(gatherReport)(renderToConsole);
  R.map(renderReport, requestedServices)
}

go([]);
