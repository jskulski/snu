const R = require('ramda');
const nconf = require('nconf');
const nconfYAML = require('nconf-yaml');
const fs = require('fs');
const AllServices = require('./services').ALL;

const CONFIG_FILE_PATH = '/Users/jskulski/.snu.config.json';
const SERVICE_VISIBLE = true
const SERVICE_HIDDEN = false

// defaultConfig :: Config
function defaultConfig() {
  return generateConfig(AllServices);
}

// generateConfig :: [ Services ] -> [ Services ] -> Config
function generateConfig(shown, hidden) {

  shown = shown || [];
  hidden = hidden || [];

  const getKeys = R.map(R.prop('key'));
  const shownKeys = getKeys(shown);
  const hiddenKeys = getKeys(hidden);

  return {
    shown: shownKeys,
    hidden: hiddenKeys
  }
}

// saveConfig :: Config? -> [Side Effect] FS IO
function saveConfig(config) {
  config = config || defaultConfig();
  nconf.set('services', config);
  nconf.save();
}

// loadConfig :: [Side Effect FS] Config
function loadConfig() {
  nconf.argv()
    .env()
    .file({
      file: CONFIG_FILE_PATH,
      format: nconfYAML
    })
    .defaults(defaultConfig());
  return nconf.get('services');
}

module.exports = {
  generateConfig,
  saveConfig,
  loadConfig
}
