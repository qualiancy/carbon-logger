# Carbon Logger

> Logging middleware for Carbon proxy/balancer.

### What is Carbon?

Carbon is middleware based proxy for table or cluster/balanced based routing. It
features zero-downtime restart, websocket support, and custom middleware. You can
learn more about it at [qualiancy/carbon](https://github.com/qualiancy/carbon).

### What is Quantum?

Quantum is a transport-agnostic event based JSON logging framework. It supports
multiple transports per logger and comes bundled with multi-themed console 
logging and JSON file support. It has many other transports available such as 
database support or network transports for multiple service log aggregation.
You can learn more about it at [qualiancy/quantum](https://github.com/qualiancy/quantum).

## Usage

To get started, create a new carbon proxy and mount the logging middleware before
you mount your other carbon middleware, such as a balancer.

```js
var carbon = require('carbon')
  , proxy = carbon.listen(8080)
  , carbonLogger = require('carbon-logger');
  , logger = carbonLogger('my-app');

logger
  .use(carbonLogger.console({ theme: 'simple' }))
  .use(carbonLogger.writeFile(__dirname + '/logs'))
  .start();

proxy
  .use(logger.middleware);
  .use(carbon.balancer(__dirname + '/app.js', { 
      workers: 4
    , watch: true
    , host: 'myapp.com'
  }).middleware);
```

## Tests

Tests are written in the BDD styles for the [Mocha](http://visionmedia.github.com/mocha) test runner using the
`should` assertion interface from [Chai](http://chaijs.com). Running tests is simple:

    $ make test

## Contributing

Interested in contributing? Fork to get started. Contact [@logicalparadox](http://github.com/logicalparadox) 
if you are interested in being regular contributor.

##### Contibutors 

* Jake Luer ([@logicalparadox](http://github.com/logicalparadox))

## License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@qualiancy.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
