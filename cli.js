#!/usr/bin/env node
'use strict'
const R = require('ramda');

const Services = require('./services');
const gatherReport = require('./snu').gatherReport;
const renderToConsole = require('./renderers').renderToConsole;

function go(config, renderer) {
  var requestedServices;
  if (!config || !config.services || config.services.length == 0) {
    requestedServices = Services.ALL;
  }
  else {
    const inConfig = (svc) => R.contains(svc.key, config.services),
    requestedServices = R.filter(inConfig, Services.ALL);
  }

  const renderReport = R.curry(gatherReport)(renderer);
  R.map(renderReport, requestedServices)
}

const config = {
  services: []
}

go(config, renderToConsole);
