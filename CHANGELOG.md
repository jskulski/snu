# Change Log
All notable changes to this project will be documented in this file. This change log follows the conventions of [keepachangelog.com](http://keepachangelog.com/).

## [0.6.2] - 2016-06-21
- Updating path in tests to mock github path.  

## [0.6.1] - 2016-06-21
- Github service switched to using last-message over parsing message history.
  The message history API started returning '[]'.

## [0.6.0] - 2016-06-14
### Changed
- Added Heroku as service
- Capturing minor incidents for the first time!
- Split up spec into separate files

## [0.5.0] - 2016-06-14
### Added
- Renderers are now outside of CLI context
- Indications less than Green now show message and url.
- Tests for renderers (render to console to visually verify)
- Travis CI support

## [0.4.0] - 2016-06-11
### Changed
- Fixed tests and built suite to test Github and Statuspage parsers
- Moving to explicit human readable Label
- Added some vscode/ms javascript config.

## [0.3.0] - 2016-06-11
### Added
- Adding concept of Service, with allows specification of parsing
- Added `github` as service

### Changed
- `npm test` is now just running the program until spec.js is in order
- Cleaning up config/service interface

## [0.2.1] - 2016-06-11
### Changed
- README to better mirror instructions

## [0.2.0] - 2016-06-11
### Added
- Support for command line calling in npm

## [0.1.1] - 2016-06-11
### Added
- Changelog for last release

### Fixed
- Missing dependencies to package.json (node-fetch, invariant)

## [0.1.0] - 2016-06-11
### Added
- Published to npm!
- Renamed project from `gua` to `snu`
  Reasoning was:
    - `gua` was taken on npm. `snu` was free
    - `snu` is easy to type, so easy to check
    - "What's that project called?"
      "Snu"
      "What's snu?"
      "I dunno what's snu with you"

## [Unreleased][unreleased]
### Added
- Added twilio as service

## [Unreleased][unreleased]
### Added
- Added basic functionality to fetch and parse Statuspage.io subscriber's status
- These include:
    aptible
    quay
    circleci
    vimeo
    travisci
    uservoice
    hipchat
    newrelic
    bitbucket
    disqus
    kickstarter
    kmstatus
    gotomeeting
    parse

## [Unreleased][unreleased]
### Changed
- Removed project and installed node skeleton.
  Startup time cost of clojure was too expensive to be useful.
  Plus we gain npm's distrobution channles

## [Unreleased][unreleased]
### Changed
- Added clojure command line util.


