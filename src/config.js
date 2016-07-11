const R = require('ramda');
const nconf = require('nconf');
const fs = require('fs');
const AllServices = require('./services').ALL;

const CONFIG_FILE_PATH = '/Users/jskulski/.snu.config.json';
const SERVICE_VISIBLE = true
const SERVICE_HIDDEN = false

// defaultConfig :: Config
function defaultConfig() {
  return {
    services: generateConfig(AllServices)
  }
}

// generateConfig :: [ Services ] -> Config
function generateConfig(serviceDirectory) {

  const serviceKeys = R.map(R.prop('key'), serviceDirectory);
  const serviceVisibilityStatuses = R.times(() => SERVICE_VISIBLE, serviceKeys.length)
  const servicesConfig = R.zipObj(serviceKeys, serviceVisibilityStatuses)

  return {
    services: servicesConfig
  }
}

// saveConfig :: Config? -> [Side Effect] FS IO
function saveConfig(config) {
  config = config || defaultConfig();
  nconf.set('services', config.services);
  nconf.save();
}

// loadConfig :: [Side Effect FS] Config
function loadConfig() {
  nconf.argv()
    .env()
    .file({ file: CONFIG_FILE_PATH })
    .defaults(defaultConfig());
  return nconf.get('services');
}

module.exports = {
  generateConfig,
  saveConfig,
  loadConfig
}
