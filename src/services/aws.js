const xml2js = require('xml2js');
const R = require('ramda');

const Service = require('./service');
const Color = require('../data').Color;
const Indicator = require('../data').Indicator;

function AwsService() {

  const key = 'amazon';
  const label = 'Amazon AWS';
  const url = 'http://status.aws.amazon.com/rss/all.rss';

  // data AWSStatusObject

  // _parseXML :: AwsString -> Object
  function _parseXML(text) {
    return new Promise(function(resolve, reject) {
      xml2js.parseString(text, function(err, xml) {
        if (!err) {
          resolve(xml);
        }
        else {
          reject(err);
        }
      });
    })
  }

  // _parseIncident :: AWSStatusObject -> Incident
  function _parseIncident(awsStatusObject) {
    var color;
    const latestTitle = _latestItemTitle(awsStatusObject);
    const inResolvedState = latestTitle.indexOf('[RESOLVED]') !== -1;

    if (inResolvedState) {
      color = Color('green');
    }
    else {
      color = Color('red');
    }

    return Indicator(key, label, color, 'ok msg', url)
  }

  // _latestItemTitle :: AWSStatusObject -> String
  function _latestItemTitle(awsStatusObject) {
      return awsStatusObject.rss.channel[0].item[0].title[0]['_']
  }


  // _parseRSS :: Promised Response -> AWSStatusObject
  function _parseResponse(response) {
    return response.text()
                   .then(_parseXML)
                   .then(_parseIncident);
  }

  return Service(key, label, url, _parseResponse);
}

module.exports = AwsService;