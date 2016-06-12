#!/usr/bin/env node
'use strict'
const R = require('ramda');

const Services = require('./services');
const gatherReport = require('./snu').gatherReport;
const renderToConsole = require('./renderers').renderToConsole;

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
