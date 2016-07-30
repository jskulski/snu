const R = require('ramda');
const nconf = require('nconf');
const nconfYAML = require('nconf-yaml');
const fs = require('fs');
const Services = require('./services');

const SERVICE_VISIBLE = true
const SERVICE_HIDDEN = false

// defaultConfig :: Config
function defaultConfig() {
  return generateConfig(Services.ShownByDefault, Services.HiddenByDefault);
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

// setOptions :: Filepath -> [Side Effects] Global Mutation
function setOptions(filePath) {
  nconf.argv()
    .env()
    .file({
      file: filePath,
      format: nconfYAML
    })
    .defaults({'services': defaultConfig()});
}

// saveDefaultConfig :: Config? -> [Side Effect] FS IO
function saveDefaultConfig(filePath) {
  setOptions(filePath);

  nconf.set('services', defaultConfig());
  nconf.save();
}

// saveConfig :: Config? -> [Side Effect] FS IO
function saveConfig(config, filePath) {
  setOptions(filePath);

  config = config || defaultConfig();
  nconf.set('services', config);
  nconf.save();
}

// loadConfig :: [Side Effect FS] Config
function loadConfig(filePath) {
  setOptions(filePath);
  return nconf.get('services');
}

module.exports = {
  generateConfig,
  saveConfig,
  saveDefaultConfig,
  loadConfig
}
