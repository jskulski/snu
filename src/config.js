const R = require('ramda');
const nconf = require('nconf');
const fs = require('fs');

const SERVICE_VISIBLE = true

// generateConfig :: [ Services ] -> Config
function generateConfig(serviceDirectory) {

  const serviceKeys = R.map(R.prop('key'), serviceDirectory);
  const serviceVisibilityStatuses = R.times(() => SERVICE_VISIBLE, serviceKeys.length)
  const servicesConfig = R.zipObj(serviceKeys, serviceVisibilityStatuses)

  return {
    services: servicesConfig
  }
}

// saveConfigToDisk :: Filepath -> Config -> [Side Effect] FS IO
function saveConfigToDisk(filepath, config) {
  nconf.argv()
   .env()
   .file({ file: filepath });

  nconf.set('services', config.services);

  nconf.save(function (err) {
    fs.readFile(filepath, function (err, data) {
      console.dir(JSON.parse(data.toString()))
    });
  });
}

module.exports = {
  generateConfig,
  saveConfigToDisk
}
