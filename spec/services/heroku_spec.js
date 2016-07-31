const HerokuService = require('../../src/services/heroku');

const nock = require('nock');
const assert = require('chai').assert;
const sinon = require('sinon');

const gatherReport = require('../../src/snu').gatherReport;
const Indicator = require('../../src/data').Indicator;
const Color = require('../../src/data').Color;

const shouldBe = require('./common').shouldBe;

describe('Heroku parse', () => {

  const key = 'heroku';
  const label = 'Heroku';
  const domain = 'https://status.heroku.com';
  const path = '/api/ui/availabilities';
  const service = HerokuService()

  const api = nock(domain).get(path);
  const successJSON = _JSON('green');
  const otherJSON = _JSON('other string than green');

  it('should parse an OK event', (done) => {
    api.reply(200, successJSON);
    const expected = Indicator(key, label, Color('green'), 'OK', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  });


  it('any other event is a MAJOR event', (done) => {
    api.reply(200, otherJSON);
    const expected = Indicator(key, label, Color('red'), 'Heroku is reporting issues.', domain);
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  });

  function _JSON(color) {
    return {
      "data": [
        {
          "id": "132",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/132"
          },
          "attributes": {
            "date": "2016-06-14",
            "region": "US",
            "calculation": 0.99999970279862,
            "color": color,
            "magnitude": "none"
          }
        },
        {
          "id": "129",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/129"
          },
          "attributes": {
            "date": "2016-06-13",
            "region": "US",
            "calculation": 0.99997656870965,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "127",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/127"
          },
          "attributes": {
            "date": "2016-06-12",
            "region": "US",
            "calculation": 0.99997658671032,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "125",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/125"
          },
          "attributes": {
            "date": "2016-06-11",
            "region": "US",
            "calculation": 0.99997658413163,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "123",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/123"
          },
          "attributes": {
            "date": "2016-06-10",
            "region": "US",
            "calculation": 0.9999881679038,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "122",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/122"
          },
          "attributes": {
            "date": "2016-06-09",
            "region": "US",
            "calculation": 0.99995345359171,
            "color": "red",
            "magnitude": "medium"
          }
        },
        {
          "id": "61",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/61"
          },
          "attributes": {
            "date": "2016-06-08",
            "region": "US",
            "calculation": 0.99990718132317,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "62",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/62"
          },
          "attributes": {
            "date": "2016-06-07",
            "region": "US",
            "calculation": 0.9999998041369,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "63",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/63"
          },
          "attributes": {
            "date": "2016-06-06",
            "region": "US",
            "calculation": 0.99999979549756,
            "color": "green",
            "magnitude": "none"
          }
        },
        {
          "id": "64",
          "type": "availabilities",
          "links": {
            "self": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities\/64"
          },
          "attributes": {
            "date": "2016-06-05",
            "region": "US",
            "calculation": 0.99999980937549,
            "color": "green",
            "magnitude": "none"
          }
        }
      ],
      "meta": {
        "total-availability": 99.997777,
        "record-count": 66
      },
      "links": {
        "first": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities?page%5Bnumber%5D=1&page%5Bsize%5D=10",
        "next": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities?page%5Bnumber%5D=2&page%5Bsize%5D=10",
        "last": "https:\/\/status-api.heroku.com\/api\/ui\/availabilities?page%5Bnumber%5D=7&page%5Bsize%5D=10"
      }
    }
  }
});