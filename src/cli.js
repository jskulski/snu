#!/usr/bin/env node
'use strict'
const R = require('ramda');

const go = require('./snu').go;
const gatherReport = require('./snu').gatherReport;
const renderToConsole = require('./renderers').renderToConsole;


// const config = {
//   services: []
// }
const config = require('./config');
const cfg = config.loadConfig()
console.log(cfg);
// config.saveConfig(cfg) // saves default if not loaded

go(cfg, renderToConsole);
