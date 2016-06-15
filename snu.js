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

// data Message = String
// data Indicator = Key | Label | Color | Message | URL
function Indicator(key, label, color, message, moreInfoUrl) {
  invariant(key, 'Must have a valid key');
  invariant(label, 'Must have a valid label');
  invariant(color, 'Indicator must have a valid color');
  invariant(message, 'Indicator must have a valid message');
  invariant(moreInfoUrl, 'Indicator must have a valid moreInfoUrl');

  return {
    key: key,
    label: label,
    color: color,
    message: message,
    moreInfoUrl: moreInfoUrl
  }
}

module.exports = {
  gatherReport,
  Indicator,
  Color
}
