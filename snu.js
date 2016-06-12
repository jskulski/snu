const invariant = require('invariant');
const fetch = require('node-fetch');

// gatherReport :: Renderer -> Service -> Indicator (Side effect)
function gatherReport(renderer, service) {
  fetch(service.url)
    .then((resp) => resp.json()) // TODO: pass promise around to allow other methods than JSON?
    .then(service.parser)
    .then(renderer)
    .catch((error) => console.log('error fetching '+ service.key +': ' + error));
}

// data = 'green' || 'yellow' || 'red'
function Color(name) {
  invariant(name == 'green' || name == 'yellow' || name == 'red' || name == 'black', 'Color name not appropriate');
  return name;
}

// data Indicator = Key | Label | Color
function Indicator(key, label, color) {
  return {
    key: key,
    label: label,
    color: color
  }
}

module.exports = {
  gatherReport,
  Indicator,
  Color
}
