#!/usr/bin/env node
'use strict'
const R = require('ramda');

const go = require('./snu').go;
const gatherReport = require('./snu').gatherReport;
const renderToConsole = require('./renderers').renderToConsole;

const cliConfig = require('./cli_config');
const servicesConfig = require('./services_config');

// TODO: this should be in cli_config.js
const servicesConfigFilePath = cliConfig['config-filepath'];
const initializeSnuRC = cliConfig['init'];
const showQuickHelp = cliConfig['quick-help'];
const showHelp = cliConfig['help'];

if (initializeSnuRC) {
    servicesConfig.saveDefaultConfig(servicesConfigFilePath);
}

const cfg = servicesConfig.loadConfig(servicesConfigFilePath);
go(cfg, renderToConsole);
