const nock = require('nock');
const assert = require('chai').assert;
const sinon = require('sinon');

const gatherReport = require('./snu').gatherReport;
const Indicator = require('./snu').Indicator;
const Color = require('./snu').Color;

function shouldBe(expectedIndicator, done) {
  return function(actualIndicator) {
    assert.deepEqual(actualIndicator, expectedIndicator);
    done();
  }
}

const StatuspageIOService = require('./services').StatuspageIOService;

describe('StatuspageIO parsing', () => {
  const domain = 'http://status.somestatuspageiosubscriber.com'
  const path = '/index.json'
  const key = 'key';
  const label = 'Label';

  const service = StatuspageIOService(key, label, domain + path);

  const api = nock(domain).get(path);
  const successJSON = _JSON('none');
  const minorJSON = _JSON('minor');
  const majorJSON = _JSON('major');
  const unknownJSON = _JSON('unknown');

  it('should parse OK issue response', (done) => {
    api.reply(200, successJSON);
    const expected = Indicator(key, label, Color('green'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  });

  it('should parse MINOR issue response', (done) => {
    api.reply(200, minorJSON);
    const expected = Indicator(key, label, Color('yellow'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  });

  it('should parse MAJOR issue response', (done) => {
    api.reply(200, majorJSON);
    const expected = Indicator(key, label, Color('red'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  });

  it('should parse UNKNOWN issue response', (done) => {
    api.reply(200, unknownJSON);
    const expected = Indicator(key, label, Color('black'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  });

  function _JSON(statusIndicator) {
    return {
      "page": {
        "id": "8szqd6w4s277",
        "name": "Quay.io",
        "url": "http://status.quay.io"
      },
      "status": {
        "indicator": statusIndicator,
        "description": "All Systems Operational"
      },
      "components": [{"status":"operational","name":"Frontend and API","created_at":"2014-06-10T18:51:48.657Z","updated_at":"2015-10-21T01:54:42.546Z","position":1,"description":null,"id":"29ttvthc3tc7","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Registry and Index","created_at":"2014-06-10T18:58:44.723Z","updated_at":"2016-02-12T22:19:48.896Z","position":2,"description":null,"id":"72xlygjldsvt","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Build system","created_at":"2016-01-11T23:11:15.584Z","updated_at":"2016-05-31T15:42:37.283Z","position":3,"description":null,"id":"dfmblnbcpjck","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Amazon Web Services","created_at":"2014-06-10T18:56:27.398Z","updated_at":"2016-05-18T20:06:07.174Z","position":4,"description":null,"id":"jvqthbptt418","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Database Layer","created_at":"2014-06-10T18:56:32.264Z","updated_at":"2016-01-11T23:11:25.686Z","position":5,"description":null,"id":"39m0phvy2ngx","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"GitHub","created_at":"2014-06-10T18:56:45.467Z","updated_at":"2016-06-01T16:40:44.021Z","position":6,"description":"Current status of GitHub, which *may* affect build triggers. More information can be found at https://status.github.com/","id":"l46sw2h69rcg","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Payment Management","created_at":"2015-01-05T19:17:28.074Z","updated_at":"2016-03-13T01:03:30.767Z","position":7,"description":null,"id":"v5t1yz72lkpg","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Plan Management","created_at":"2015-01-05T19:17:28.855Z","updated_at":"2016-06-01T12:17:41.548Z","position":8,"description":null,"id":"l0sxg2qk0nnc","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Atlassian Bitbucket Webhooks","created_at":"2015-08-24T16:01:22.533Z","updated_at":"2016-04-06T13:01:09.289Z","position":9,"description":null,"id":"0mp292x3bpbg","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Atlassian Bitbucket SSH","created_at":"2015-08-24T16:01:27.147Z","updated_at":"2016-05-24T16:38:58.964Z","position":10,"description":null,"id":"lqhp2grqqfqg","page_id":"8szqd6w4s277","group_id":null},{"status":"operational","name":"Atlassian Bitbucket API","created_at":"2015-08-24T16:01:29.374Z","updated_at":"2016-05-24T17:23:25.050Z","position":11,"description":null,"id":"kmhm6qkfw8g6","page_id":"8szqd6w4s277","group_id":null}],
      "incidents": [{"name":"Investigating issue sending email","status":"resolved","created_at":"2016-06-02T10:43:09.551-04:00","updated_at":"2016-06-03T14:02:34.371-04:00","monitoring_at":"2016-06-02T15:59:13.654-04:00","resolved_at":"2016-06-03T14:02:34.342-04:00","impact":"none","shortlink":"http://stspg.io/2Pe3","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"8kxqfd750j11","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"Email should be functioning again","created_at":"2016-06-03T14:02:34.342-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-06-03T14:02:34.342-04:00","display_at":"2016-06-03T14:02:34.342-04:00","affected_components":[{"name":"No components were affected by this update."}],"id":"mfht6zcthwhg","incident_id":"8kxqfd750j11"},{"status":"monitoring","body":"We're awaiting our email system to be reactivated after the earlier outage","created_at":"2016-06-02T15:59:13.654-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-06-02T15:59:13.654-04:00","display_at":"2016-06-02T15:59:13.654-04:00","affected_components":[{"name":"No components were affected by this update."}],"id":"lgynj1tvxybj","incident_id":"8kxqfd750j11"},{"status":"investigating","body":"We're currently investigating an issue when trying to send email. All signup, recovery and notification emails will be suspended.","created_at":"2016-06-02T10:43:09.874-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-06-02T10:43:09.874-04:00","display_at":"2016-06-02T10:43:09.874-04:00","affected_components":[{"name":"No components were affected by this update."}],"id":"thf4699h62nh","incident_id":"8kxqfd750j11"}]},{"name":"Builds stuck in \"preparing build node\" state due to an earlier outage.","status":"resolved","created_at":"2016-05-31T10:55:36.771-04:00","updated_at":"2016-05-31T14:13:03.078-04:00","monitoring_at":"2016-05-31T11:42:06.560-04:00","resolved_at":"2016-05-31T14:13:03.045-04:00","impact":"minor","shortlink":"http://stspg.io/2P6h","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"fq032cl5k8c7","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"Builds are confirmed to be functioning as intended. All previously stuck builds are marked as failed.","created_at":"2016-05-31T14:13:03.045-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-05-31T14:13:03.045-04:00","display_at":"2016-05-31T14:13:03.045-04:00","affected_components":[{"name":"No components were affected by this update."}],"id":"jlfc0278vkyx","incident_id":"fq032cl5k8c7"},{"status":"monitoring","body":"We have resolved the issue, and will continue to monitor for residual failures.","created_at":"2016-05-31T11:42:06.560-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-05-31T11:42:06.560-04:00","display_at":"2016-05-31T11:42:06.560-04:00","affected_components":[{"name":"No components were affected by this update."}],"id":"brh9nkxmc7w4","incident_id":"fq032cl5k8c7"},{"status":"identified","body":"We are continuing to receive reports of builds which are stuck due to an earlier outage. We will update this status when the problem has been resolved.","created_at":"2016-05-31T10:55:37.173-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-05-31T10:55:37.173-04:00","display_at":"2016-05-31T10:55:37.173-04:00","affected_components":[{"name":"No components were affected by this update."}],"id":"0yqqp5sr1zr6","incident_id":"fq032cl5k8c7"}]},{"name":"Database Maintenance","status":"completed","created_at":"2016-04-22T15:27:44.545-04:00","updated_at":"2016-04-23T18:41:42.435-04:00","monitoring_at":null,"resolved_at":"2016-04-23T18:41:40.587-04:00","impact":"none","shortlink":"http://stspg.io/2D57","postmortem_ignored":true,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":"2016-04-23T15:00:00.000-04:00","scheduled_until":"2016-04-23T17:00:00.000-04:00","scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"71rmbb4drm25","page_id":"8szqd6w4s277","incident_updates":[{"status":"completed","body":"The scheduled maintenance has been completed.","created_at":"2016-04-23T18:41:40.587-04:00","wants_twitter_update":true,"twitter_updated_at":"2016-04-23T22:41:42.427Z","updated_at":"2016-04-23T18:41:42.427-04:00","display_at":"2016-04-23T18:41:40.587-04:00","affected_components":null,"id":"g4srgrxn17mz","incident_id":"71rmbb4drm25"},{"status":"scheduled","body":"On Saturday, April 23rd from 3-5 PM Eastern we will be performing database maintenance. We do not expect there to be any downtime during this time. However, operations may appear slower than usual.","created_at":"2016-04-22T15:27:44.901-04:00","wants_twitter_update":true,"twitter_updated_at":"2016-04-22T19:27:46.426Z","updated_at":"2016-04-22T15:27:46.426-04:00","display_at":"2016-04-22T15:27:44.901-04:00","affected_components":null,"id":"9vzr7xjczj9z","incident_id":"71rmbb4drm25"}]},{"name":"Increased Build Latency due to Earlier EC2 Outage","status":"resolved","created_at":"2016-03-30T22:52:19.683-04:00","updated_at":"2016-03-31T01:10:51.401-04:00","monitoring_at":"2016-03-30T23:29:54.982-04:00","resolved_at":"2016-03-31T01:10:51.372-04:00","impact":"major","shortlink":"http://stspg.io/27IK","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"vnx89mtwpyjg","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"While EC2 is still reporting issues, the build system has been processing builds for the last hour without apparent problem, so we are closing this issue at this time. We will reopen if anything regresses.","created_at":"2016-03-31T01:10:51.372-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-03-31T01:10:51.372-04:00","display_at":"2016-03-31T01:10:51.372-04:00","affected_components":null,"id":"d5zmhdcqftpg","incident_id":"vnx89mtwpyjg"},{"status":"monitoring","body":"Builds appear to be flowing again. We will continue to monitor the situation for regressions.","created_at":"2016-03-30T23:29:54.982-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-03-30T23:29:54.982-04:00","display_at":"2016-03-30T23:29:54.982-04:00","affected_components":null,"id":"d755c49z9gfh","incident_id":"vnx89mtwpyjg"},{"status":"investigating","body":"We are currently unable to schedule new builds due to the EC2 outage. For more information please refer to the AWS status page: http://status.aws.amazon.com/","created_at":"2016-03-30T22:52:19.958-04:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-03-30T22:52:19.958-04:00","display_at":"2016-03-30T22:52:19.958-04:00","affected_components":null,"id":"wdvmhd8htmj2","incident_id":"vnx89mtwpyjg"}]},{"name":"Emergency Database Maintenance","status":"resolved","created_at":"2016-02-12T17:15:27.425-05:00","updated_at":"2016-02-12T17:19:48.878-05:00","monitoring_at":"2016-02-12T17:15:27.720-05:00","resolved_at":"2016-02-12T17:19:48.850-05:00","impact":"major","shortlink":"http://stspg.io/1x9C","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"cdcdfpgngkfc","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"The database maintenance is now complete.","created_at":"2016-02-12T17:19:48.850-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-02-12T17:19:48.850-05:00","display_at":"2016-02-12T17:19:48.850-05:00","affected_components":null,"id":"klcfmngpcdmc","incident_id":"cdcdfpgngkfc"},{"status":"monitoring","body":"An emergency database maintenance window is now in effect, affecting push and pull functionality. We are very sorry about the inconvenience.","created_at":"2016-02-12T17:15:27.720-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-02-12T17:15:27.720-05:00","display_at":"2016-02-12T17:15:27.720-05:00","affected_components":null,"id":"cclmpdgnmpnf","incident_id":"cdcdfpgngkfc"}]},{"name":"Some pushes on Docker versions \u003c1.10 are failing","status":"resolved","created_at":"2016-02-11T18:48:16.855-05:00","updated_at":"2016-02-11T19:09:49.363-05:00","monitoring_at":null,"resolved_at":"2016-02-11T19:09:49.035-05:00","impact":"minor","shortlink":"http://stspg.io/1wv7","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"dgkhfcpbnnln","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"A fix has been deployed and pushes on all versions of Docker should operate normally.","created_at":"2016-02-11T19:09:49.035-05:00","wants_twitter_update":true,"twitter_updated_at":"2016-02-12T00:09:49.361Z","updated_at":"2016-02-11T19:09:49.361-05:00","display_at":"2016-02-11T19:09:49.035-05:00","affected_components":null,"id":"gllpbkmmfchl","incident_id":"dgkhfcpbnnln"},{"status":"identified","body":"Some pushes using non-latest docker are failing. We're deploying a fix now.","created_at":"2016-02-11T18:48:17.147-05:00","wants_twitter_update":true,"twitter_updated_at":"2016-02-11T23:48:17.528Z","updated_at":"2016-02-11T18:48:17.528-05:00","display_at":"2016-02-11T18:48:17.147-05:00","affected_components":null,"id":"ljjhhdmcnfdd","incident_id":"dgkhfcpbnnln"}]},{"name":"Investigating issue with build cluster","status":"resolved","created_at":"2016-01-11T18:11:00.552-05:00","updated_at":"2016-01-11T19:53:05.283-05:00","monitoring_at":null,"resolved_at":"2016-01-11T19:53:05.252-05:00","impact":"major","shortlink":"http://stspg.io/1qKb","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"dgpngbdkjpnj","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"We have resolved the issue with coordination of build jobs.","created_at":"2016-01-11T19:53:05.252-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-01-11T19:53:05.252-05:00","display_at":"2016-01-11T19:53:05.252-05:00","affected_components":null,"id":"cjlpkfnmblfp","incident_id":"dgpngbdkjpnj"},{"status":"investigating","body":"At this time builds are paused while we investigate an issue with the build cluster","created_at":"2016-01-11T18:11:00.879-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2016-01-11T18:11:00.879-05:00","display_at":"2016-01-11T18:11:00.879-05:00","affected_components":null,"id":"dlckjcmknlbf","incident_id":"dgpngbdkjpnj"}]},{"name":"Monitoring fix for 504 timeouts when pushing","status":"resolved","created_at":"2015-12-02T22:28:50.729-05:00","updated_at":"2015-12-03T01:56:05.362-05:00","monitoring_at":"2015-12-03T00:26:31.444-05:00","resolved_at":"2015-12-03T01:56:05.331-05:00","impact":"minor","shortlink":"http://stspg.io/1j7V","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"43ndxpffjtcv","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"This incident has been resolved.","created_at":"2015-12-03T01:56:05.331-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-12-03T01:56:05.331-05:00","display_at":"2015-12-03T01:56:05.331-05:00","affected_components":null,"id":"4vfhtg3m55r5","incident_id":"43ndxpffjtcv"},{"status":"monitoring","body":"We've pushed a fix that appears to have solved the problem. We'll continue monitoring for the next few hours. Please report any further issues and we apologize for the inconvenience.","created_at":"2015-12-03T00:26:31.444-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-12-03T00:26:31.444-05:00","display_at":"2015-12-03T00:26:31.444-05:00","affected_components":null,"id":"3hb0gm2b8b3n","incident_id":"43ndxpffjtcv"},{"status":"investigating","body":"We're currently investigating reports of 504 timeouts when pushing images","created_at":"2015-12-02T22:28:50.988-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-12-02T22:28:50.988-05:00","display_at":"2015-12-02T22:28:50.988-05:00","affected_components":null,"id":"vmstjpytm3sv","incident_id":"43ndxpffjtcv"}]},{"name":"ACI signature pulls not working","status":"resolved","created_at":"2015-11-24T19:08:44.657-05:00","updated_at":"2015-11-25T13:36:19.943-05:00","monitoring_at":"2015-11-24T19:08:44.900-05:00","resolved_at":"2015-11-25T13:36:19.914-05:00","impact":"none","shortlink":"http://stspg.io/1hXD","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"7v74kbgbd9y6","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"A fix has been deployed and `rkt fetch` should again function as intended.","created_at":"2015-11-25T13:36:19.914-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-11-25T13:36:19.914-05:00","display_at":"2015-11-25T13:36:19.914-05:00","affected_components":null,"id":"94gtvwtrs0yh","incident_id":"7v74kbgbd9y6"},{"status":"monitoring","body":"Due to a recent change, ACI signatures are not being returned on `rkt fetch` calls. We have a fix going out shortly. As a workaround, the insecure pull flag can be specified.","created_at":"2015-11-24T19:08:44.900-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-11-24T19:08:44.900-05:00","display_at":"2015-11-24T19:08:44.900-05:00","affected_components":null,"id":"4pdkzr9vmnr2","incident_id":"7v74kbgbd9y6"}]},{"name":"Problems with v2 pulls returning stale images","status":"resolved","created_at":"2015-11-19T10:38:29.346-05:00","updated_at":"2015-11-19T16:15:03.988-05:00","monitoring_at":"2015-11-19T15:18:40.406-05:00","resolved_at":"2015-11-19T16:15:03.853-05:00","impact":"minor","shortlink":"http://stspg.io/1gQD","postmortem_ignored":false,"postmortem_body":null,"postmortem_body_last_updated_at":null,"postmortem_published_at":null,"postmortem_notified_subscribers":false,"postmortem_notified_twitter":false,"backfilled":false,"scheduled_for":null,"scheduled_until":null,"scheduled_remind_prior":false,"scheduled_reminded_at":null,"impact_override":null,"scheduled_auto_in_progress":false,"scheduled_auto_completed":false,"id":"dwvj55m6968w","page_id":"8szqd6w4s277","incident_updates":[{"status":"resolved","body":"This incident has been resolved.","created_at":"2015-11-19T16:15:03.853-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-11-19T16:15:03.853-05:00","display_at":"2015-11-19T16:15:03.853-05:00","affected_components":null,"id":"p0qhh2zbg9m1","incident_id":"dwvj55m6968w"},{"status":"monitoring","body":"We have identified and fixed a bug which was causing stale images to be returned when a tag was recently updated. We are sorry about the inconvenience. We are continuing to monitor for additional v2 related bugs. If you encounter such a bug, please send us an email at support@quay.io.","created_at":"2015-11-19T15:18:40.406-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-11-19T15:18:40.406-05:00","display_at":"2015-11-19T15:18:40.406-05:00","affected_components":null,"id":"g48j22tn5jdq","incident_id":"dwvj55m6968w"},{"status":"investigating","body":"We are investigating reports that pulls through our v2 registry gateway are returning stale images. We do not believe that any data loss has occurred, and will update this incident with more information shortly.","created_at":"2015-11-19T10:38:29.563-05:00","wants_twitter_update":false,"twitter_updated_at":null,"updated_at":"2015-11-19T10:38:29.563-05:00","display_at":"2015-11-19T10:38:29.563-05:00","affected_components":null,"id":"vblj0gw3l701","incident_id":"dwvj55m6968w"}]}]
    }
  }

});


const GithubService = require('./services').GithubService;

describe('Github parser', () => {
  const key = 'key';
  const label = 'Github';
  const domain = 'https://status.github.com';
  const path = '/api/messages.json';

  const service = GithubService(key, domain + path)

  const api = nock(domain).get(path);
  const successJSON = _JSON('good');
  const minorJSON = _JSON('minor');
  const majorJSON = _JSON('major');
  const unknownJSON = _JSON('unknown');

  it('should parse OK response', (done) => {
    api.reply(200, successJSON);
    const expected = Indicator(key, label, Color('green'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  it('should parse MINOR response', (done) => {
    api.reply(200, minorJSON);
    const expected = Indicator(key, label, Color('yellow'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  it('should parse MAJOR response', (done) => {
    api.reply(200, majorJSON);
    const expected = Indicator(key, label, Color('red'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  it('should parse UNKNOWN response', (done) => {
    api.reply(200, unknownJSON);
    const expected = Indicator(key, label, Color('black'));
    const spy = sinon.spy(shouldBe(expected, done));

    gatherReport(spy, service);
  })

  function _JSON(status) {
    return [
      {
        "status": status,
        "body": "Everything operating normally.",
        "created_on": "2016-06-09T07:42:57Z"
      },
      {
        "status": "minor",
        "body": "We are investigating a minor service outage.",
        "created_on": "2016-06-09T07:41:47Z"
      }
    ]
  }

});


/**
 * These 'tests' spit out for the human eye to verify.
 */
const renderToConsole = require('./renderers').renderToConsole;

describe('Console Renderer', function() {
  it('should render an GREEN event', () => {
    const indicator = Indicator('key', 'Label', Color('green'))
    renderToConsole(indicator);
  });

  it('should render an YELLOW event', () => {
    const indicator = Indicator('key', 'Label', Color('yellow'))
    renderToConsole(indicator);
  });
  it('should render an RED event', () => {
    const indicator = Indicator('key', 'Label', Color('red'))
    renderToConsole(indicator);
  });
  it('should render an BLACK event', () => {
    const indicator = Indicator('key', 'Label', Color('black'))
    renderToConsole(indicator);
  });
});