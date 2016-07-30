# snu

[![Build Status](https://travis-ci.org/jskulski/snu.svg?branch=master)](https://travis-ci.org/jskulski/snu)

Your system depends on a lot.
Know the whole picture.

![Screenshot of snu report](/imgs/hero.png)

## Installation

Prerequisites: reasonablely recent versions of `node`, `npm`

```
$ npm install -g snu
/usr/local/bin/snu -> /usr/local/lib/node_modules/snu/cli.js
/usr/local/lib
└── snu@0.2.0
```

## Usage

By itself, `snu` will show a default list of services.
To customize the services you care about, use `snu --init`.

![Screenshot of .snurc.yml creation and editing](/imgs/snuyml.gif)

This will create a `$HOME/.snurc.yml` file.
Edit this file by hand to choose which services you want reports about.

## Developer

### Contributing

PRs welcomed. Parsing other services especially.

### Running tests

`npm install --dev`
`npm test`

### Roadmap

Towards v1.0.0:
- Features:
    - [ ] New Service: aws (How do we handle the multitudes of services/status? Two configs?)
    - [x] Generate and read config from ~/.snurc
    - [x] Give user more information (messages and urls)
    - [x] Test and make sure errors are reported
    - [x] New Service: github

- Features Stretch:
    - [ ] Verbose option (tell me just about whats broken vs full report vs exit status?)

- Engineering Wishlist:
    - [ ] Color.green over Color('green')
    - [x] Move non-cli code from cli.js to snu.js

## License

Copyright © 2016 jskulski

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
