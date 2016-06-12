const chalk = require('chalk');

const Color = require('./snu').Color;

// renderToConsole :: Indicator -> ConsoleIO (Side effect)
function renderToConsole(indicator) {
  if (indicator.color == Color('green')) {
    console.log(chalk.green(indicator.label + ': OK'));
  }
  else {
    console.log(chalk.bold.red('vvvvvvv'));
    console.log(chalk.red(indicator.label + ': NOT OK'));
    console.log(chalk.bold.red('^^^^^^'));
  }
}

module.exports = {
    renderToConsole
}