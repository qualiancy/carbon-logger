var chai = require('chai')
  , chaiSpies = require('chai-spies')
  , should = chai.should();

chai.use(chaiSpies);

var carbon = require('carbon')
  , carbonLogger = require('..')
  , http = require('http');

describe('Carbon Logger', function () {
  var proxy
    , logger
    , http1
    , http2;

  before(function (done) {
    http1 = http.createServer();
    http2 = http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('hello universe');
    });

    logger = carbonLogger('test');
    logger.start();

    proxy = carbon.listen(http1);
    proxy.use(logger.middleware);
    proxy.use(function (req, res, next) {
      next(5005);
    });

    http1.listen(5000, function () {
      http2.listen(5005, done);
    });
  });

  after(function () {
    http1.close();
    http2.close();
  });

  it('can respond to a request', function (done) {
    var spy = chai.spy(function (ev) {
      ev.level.should.equal('GET');
      ev.msg.should.equal('/');
    });

    logger.on('event', spy);

    var req = http.get({
        host: 'localhost'
      , port: 5000
      , path: '/'
    }, function (res) {
      res.statusCode.should.equal(200);
      res.on('end', function () {
        spy.should.have.been.called.once;
        done();
      });
    });
  });
});
