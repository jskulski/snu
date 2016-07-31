const GithubService = require('../../src/services/github');

const nock = require('nock');
const assert = require('chai').assert;
const sinon = require('sinon');

const gatherReport = require('../../src/snu').gatherReport;
const Indicator = require('../../src/data').Indicator;
const Color = require('../../src/data').Color;

const shouldBe = require('./common').shouldBe;

describe('Github parser', () => {
  const key = 'github';
  const label = 'Github';
  const domain = 'https://status.github.com';
  const path = '/api/last-message.json';

  const service = GithubService()

  const api = nock(domain).get(path);
  const successJSON = _JSON('good', 'ok msg');
  const minorJSON = _JSON('minor', 'minor msg');
  const majorJSON = _JSON('major', 'major msg');
  const unknownJSON = _JSON('unknown', 'unknown msg');

  it('should parse OK response', (done) => {
    api.reply(200, successJSON);
    const expected = Indicator(key, label, Color('green'), 'ok msg', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  it('should parse MINOR response', (done) => {
    api.reply(200, minorJSON);
    const expected = Indicator(key, label, Color('yellow'), 'minor msg', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  it('should parse MAJOR response', (done) => {
    api.reply(200, majorJSON);
    const expected = Indicator(key, label, Color('red'), 'major msg', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  it('should parse UNKNOWN response', (done) => {
    api.reply(200, unknownJSON);
    const expected = Indicator(key, label, Color('black'), 'unknown msg', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  function _JSON(status, message) {
    message = message || "Everything operating normally."
    return {
      "status": status,
      "body": message,
      "created_on": "2016-06-09T07:42:57Z"
    }
  }

});

