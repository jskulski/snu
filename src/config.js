const R = require('ramda');

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

module.exports = {
  generateConfig
}
