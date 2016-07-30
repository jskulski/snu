#!/usr/bin/env node
'use strict'
const R = require('ramda');

const go = require('./snu').go;
const gatherReport = require('./snu').gatherReport;
const renderIndicator = require('./renderers').renderIndicator;

const cliConfig = require('./cli_config');
const servicesConfig = require('./services_config');

const servicesConfigFilePath = cliConfig['config-filepath'];
const initializeConfigFile = cliConfig['init'];
const showQuickHelp = cliConfig['quick-help'];
const showHelp = cliConfig['help'];


if (initializeConfigFile) {
    servicesConfig.saveDefaultConfig(servicesConfigFilePath);
}

const cfg = servicesConfig.loadConfig(servicesConfigFilePath);
go(cfg, renderIndicator);
