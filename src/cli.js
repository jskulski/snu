#!/usr/bin/env node
'use strict'
const R = require('ramda');

const go = require('./snu').go;
const gatherReport = require('./snu').gatherReport;
const renderToConsole = require('./renderers').renderToConsole;


const config = require('./services_config');
const CONFIG_FILE_PATH = '/Users/jskulski/.snurc';

const cfg = config.loadConfig(CONFIG_FILE_PATH);
config.saveConfig(cfg, CONFIG_FILE_PATH);

go(cfg, renderToConsole);
