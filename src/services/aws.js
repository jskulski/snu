const R = require('ramda');

const Service = require('./service');
const Color = require('../data').Color;
const Indicator = require('../data').Indicator;

function AwsService() {

  const key = 'amazon';
  const label = 'Amazon AWS';
  const url = 'http://status.aws.amazon.com/rss/all.rss';

  // parseRSS :: AwsXML -> Indicator
  function _parseRSS(rssFeed) {
    rssFeed.text().then((xml) => {
      var simpleXML = require('simple-xml');
      console.log('wwww')
      console.log('whasd')
      console.log(xml.replace("\n", ""));
      console.log(JSON.stringify(simpleXML.parse()));
      console.log('wwww')
      return []
    });
  }

  return Service(key, label, url, _parseRSS);

}

module.exports = AwsService;