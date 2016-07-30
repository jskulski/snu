const chalk = require('chalk');
const Color = require('./data').Color;

// render :: Stringable -> ConsoleIO (Side Effect)
function render(stringable) {
  console.log(stringable);
}

// renderIndicator :: Indicator -> ConsoleIO (Side effect)
function renderIndicator(indicator) {
  if (indicator.color == Color('green')) {
    render(chalk.green(indicator.label + ': OK'));
  }
  else {
    render(chalk.bold.red('vvvvvvv'));
    render(chalk.red(indicator.label + ': NOT OK'));
    render(chalk.red('Message: ' + indicator.message));
    render(chalk.red('More information: ' + indicator.moreInfoUrl));
    render(chalk.bold.red('^^^^^^'));
  }
}

module.exports = {
  render,
    renderIndicator
}