const R = require('ramda');
const fetch = require('node-fetch');
const invariant = require('invariant');

const gua = require('./gua');

function go(config) {

  configKeyServiceMap = {
    'quay': 'http://status.quay.io/index.json'
  };

  const url = configKeyServiceMap['quay'];
  
  // TODO: better name for indicator on our side?
  function mapColor(indicator) { 
    const map = { 
      'none': gua.Color('green'),
      'minor': gua.Color('yellow'),
      'major': gua.Color('red'),
    }
    return map[indicator] ? map[indicator] : Color('black');
  }
  
  
  function parse(status) { 
    const color = mapColor(status.status.indicator);
    return gua.Indicator('quay', color);
  }
  
  function render(indicator) { 
    if (indicator.color == gua.Color('green')) { 
      console.log(indicator.key + ': OK');
    }
    else { 
      console.log('vvvvvvv');
      console.log(indicator.key, ': NOT OK');
      console.log('^^^^^^');
    }
  }

  fetch(url)
    .then((res) => res.json())
    .then((json) => parse(json))
    .then((indicator) => render(indicator));
}

go();

module.exports = go;
