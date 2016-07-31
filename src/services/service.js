const invariant = require('invariant');

// data Key = String
// data URL = String
// data Label = String
// data Parser = JSON -> Indicator
// data Service = Key | Label | URL | Parser
function Service(key, label, url, parser) {
  invariant(key, 'Service needs valid key');
  invariant(label, 'Service needs valid label')
  invariant(url, 'Service needs valid url');
  invariant(parser, 'Service needs valid parser');

  return {
    'key': key,
    'url': url,
    'label': label,
    'parser': parser,
  }
}

module.exports = Service;