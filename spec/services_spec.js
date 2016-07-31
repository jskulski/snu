const nock = require('nock');
const assert = require('chai').assert;
const sinon = require('sinon');

const gatherReport = require('../src/snu').gatherReport;
const Indicator = require('../src/data').Indicator;
const Color = require('../src/data').Color;
const shouldBe = require('./services/common').shouldBe;
