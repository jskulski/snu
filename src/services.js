'use strict'
const invariant = require('invariant');
const R = require('ramda');

const Color = require('./data').Color;
const Indicator = require('./data').Indicator;

const Service = require('./services/service');
const StatuspageIOService = require('./services/statuspageio');
const HerokuService = require('./services/heroku');
const GithubService = require('./services/github');

const ShownByDefault = [
  HerokuService(),
  GithubService(),
  StatuspageIOService('quay', 'Quay',  'http://status.quay.io'),
  StatuspageIOService('aptible', 'Aptible',  'http://status.aptible.com'),
  StatuspageIOService('circleci', 'CircleCI',  'https://circleci.statuspage.io'),
  StatuspageIOService('newrelic', 'New Relic',  'https://status.newrelic.com'),
  StatuspageIOService('twilio', 'Twilio',  'https://status.twilio.com')
];
const HiddenByDefault = [
  StatuspageIOService('travisci', 'TravisCI',  'https://www.traviscistatus.com'),
  StatuspageIOService('vimeo', 'Vimeo',  'http://www.vimeostatus.com'),
  StatuspageIOService('kickstarter', 'Kickstarter',  'http://status.kickstarter.com'),
  StatuspageIOService('gotomeeting', 'Goto Meeting',  'http://status.gotomeeting.com'),
  StatuspageIOService('disqus', 'Disqus',  'https://status.disqus.com'),
  StatuspageIOService('parse', 'Parse',  'https://status.parse.com'),
  StatuspageIOService('bitbucket', 'Bitbucket',  'http://status.bitbucket.org'),
  StatuspageIOService('uservoice', 'UserVoice',  'https://status.uservoice.com'),
  StatuspageIOService('kmstatus', 'KMstatus',  'https://kmstatus.com'),
]

const AllServices = R.union(ShownByDefault, HiddenByDefault)


module.exports = {
  All: AllServices,
  ShownByDefault: ShownByDefault,
  HiddenByDefault: HiddenByDefault,
}
