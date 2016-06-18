/**
 * These 'tests' spit out for the human eye to verify.
 */
const Indicator = require('../data').Indicator;
const Color = require('../data').Color;
const renderToConsole = require('../renderers').renderToConsole;

describe('Console Renderer', function() {
  it('should render an GREEN event', () => {
    const indicator = Indicator('key', 'Label', Color('green'), 'green msg', 'http://moreinfo.example.com')
    renderToConsole(indicator);
  });

  it('should render an YELLOW event', () => {
    const indicator = Indicator('key', 'Label', Color('yellow'), 'yellow msg', 'http://moreinfo.example.com/')
    renderToConsole(indicator);
  });

  it('should render an RED event', () => {
    const indicator = Indicator('key', 'Label', Color('red'), 'red msg', 'http://moreinfo.example.com/')
    renderToConsole(indicator);
  });

  it('should render an BLACK event', () => {
    const indicator = Indicator('key', 'Label', Color('black'), 'black msg', 'http://moreinfo.example.com/')
    renderToConsole(indicator);
  });
});