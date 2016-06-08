const R = require('ramda');
const fetch = require('node-fetch');
const invariant = require('invariant');
const chalk = require('chalk');

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
    const chalk = require('chalk');

    if (indicator.color != gua.Color('green')) { 
      console.log(chalk.green(indicator.key + ': OK'));
    }
    else { 
      console.log(chalk.bold.red('vvvvvvv'))
      console.log(chalk.red(indicator.key, ': NOT OK'))
      console.log(chalk.bold.red('^^^^^^'))
    }
  }

  fetch(url)
    .then((res) => res.json())
    .then((json) => parse(json))
    .then((indicator) => render(indicator));
}

go();

module.exports = go;
