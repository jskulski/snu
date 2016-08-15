const invariant = require('invariant');
const R = require('ramda');
const fetch = require('node-fetch');

const AllServices = require('./services').All;

function go(config, renderer) {
  goPieces(config, renderer, gatherReport, AllServices)
}

// data Config = [ ServiceKey ]
// go :: Config -> Renderer -> Side Effects?
function goPieces(config, renderer, gatherer, services) {
  var requestedServices;

  const inConfig = (svc) => R.contains(svc.key, config.shown);
  requestedServices = R.filter(inConfig, services);

  const renderReport = R.curry(gatherer)(renderer);
  R.map(renderReport, requestedServices)
}

// gatherReport :: Renderer -> Service -> Indicator (Side effect)
function gatherReport(renderer, service) {
  fetch(service.url)
    .then(service.parser)
    .then(renderer)
    .catch((error) => console.log('error fetching '+ service.key +': ' + error));
}

module.exports = {
  go,
  goPieces,
  gatherReport
}
