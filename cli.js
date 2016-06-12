#!/usr/bin/env node
'use strict'
const R = require('ramda');
const chalk = require('chalk');

const Color = require('./snu').Color;
const gatherReport = require('./snu').gatherReport;
const Services = require('./services');


// renderToConsole :: Indicator -> ConsoleIO (Side effect)
function renderToConsole(indicator) {
  if (indicator.color == Color('green')) {
    console.log(chalk.green(indicator.label + ': OK'));
  }
  else {
    console.log(chalk.bold.red('vvvvvvv'));
    console.log(chalk.red(indicator.label, ': NOT OK'));
    console.log(chalk.bold.red('^^^^^^'));
  }
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
