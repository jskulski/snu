# snu

Your system depends on a lot.
Know the whole picture.

```
$ snu
Quay.io: OK
Github.com: OK
!!
Flakr: MAJOR ISSUES:
http://status.flakr.com/issue
"We have temporarily disabled repository imports while we investigate an internal error."
!!
Circleci: OK
Twilio: OK
```

## Installation and usage

Prerequisites: reasonablely recent versions of `node`, `npm`

```
$ npm install -g snu
/usr/local/bin/snu -> /usr/local/lib/node_modules/snu/cli.js
/usr/local/lib
└── snu@0.2.0

$ snu
Quay.io: OK
Aptible: OK
CircleCI: OK
```

## Developer

### Contributing

PRs welcomed. Parsing other services especially.

### Running tests

`npm install --dev`
`npm test`


### Roadmap

Towards v1.0.0:
- New Service: aws
- Generate and read config from ~/.snurc
[x] New Service: github

Features Wishlist:
- Verbose option (tell me just about whats broken vs full report)

Engineering Wishlist:
- Move non-cli code from cli.js to snu.js
- Color.green over Color('green')

## License

Copyright © 2016 jskulski

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
