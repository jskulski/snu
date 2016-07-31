const AwsService = require('../../src/services/aws');

const nock = require('nock');
const assert = require('chai').assert;
const sinon = require('sinon');

const gatherReport = require('../../src/snu').gatherReport;
const Indicator = require('../../src/data').Indicator;
const Color = require('../../src/data').Color;

const shouldBe = require('./common').shouldBe;

describe('AWS Service', () => {

  it('reports green if there has not been a new update', () => {
    const service = AwsService();
  })

});