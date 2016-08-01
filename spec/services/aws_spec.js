const AwsService = require('../../src/services/aws');

const fs = require('fs');
const nock = require('nock');
const assert = require('chai').assert;
const sinon = require('sinon');

const gatherReport = require('../../src/snu').gatherReport;
const Indicator = require('../../src/data').Indicator;
const Color = require('../../src/data').Color;

const shouldBe = require('./common').shouldBe;

describe('AWS Service', () => {

  const service = AwsService();

  const domain = 'http://status.aws.amazon.com'
  const path = '/rss/all.rss'
  const api = nock(domain).get(path);
  const okXML = fs.readFileSync('spec/snapshots/aws.all.OK.rss');

  // const minorJSON = _JSON('minor', 'minor msg');
  // const majorJSON = _JSON('major', 'major msg');
  // const unknownJSON = _JSON('unknown', 'unknown msg');

  it.only('reports green if there has not been a new update', (done) => {
    api.reply(200, okXML);
    const expected = Indicator(service.key, service.label, Color('green'), 'ok msg', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

});