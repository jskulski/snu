#!/usr/bin/env node

'use strict'

const sh = require('shelljs');
const R = require('ramda');

const go = require('./snu').go;
const gatherReport = require('./snu').gatherReport;
const renderIndicator = require('./renderers').renderIndicator;
const render = require('./renderers').render;

const EXITS = require('./exit_statuses');
const cliConfig = require('./cli_config');
const servicesConfig = require('./services_config');

const checkServices = cliConfig['check-services'];
const servicesConfigFilePath = cliConfig['config-filepath'];
const initializeConfigFile = cliConfig['init'];
const showDisplayStatus = cliConfig['display-config-status'];
const showHelp = cliConfig['help'];

if (showHelp) {
    render(_usage())
    process.exit(EXITS.SHOWED_INFO);
}

if (initializeConfigFile) {
    render(`Writing new config file to: ${servicesConfigFilePath}`)

    if (sh.test('-f', servicesConfigFilePath)) {
        render([
            "",
            "ERROR: Existing file found!",
            "       Will not overwrite existing configuration.",
            "       Please remove manually and rerun."
        ].join("\n"));
        process.exit(1);
    }

    servicesConfig.saveDefaultConfig(servicesConfigFilePath);
    process.exit(EXITS.OK);
}

if (!sh.test('-f', servicesConfigFilePath)) {
    render([
        "",
        "NOTE: Running the command `snu --init` will initialize a config file for you.",
        "You can edit it by hand customize what services are checked.",
        ""
    ].join("\n"));
}

if (checkServices) {
    const cfg = servicesConfig.loadConfig(servicesConfigFilePath);
    go(cfg, renderIndicator);
}

function _usage() {
    return [
        "usage: snu [--help] [--init] [--config-filepath=PATH]",
        "",
        "Optional arguments: ",
        "--init                     Initializes a configuration file",
        "--config-filepath=[PATH]   Path to your config file (Default: ~/.snurc.yml)",
        "--help                     Show this help message",
    ].join("\n");
}