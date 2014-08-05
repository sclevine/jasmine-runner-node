var connect = require('connect');
var http = require('http');
var path = require('path');
var _ = require('underscore');

var phantom = require('./phantom.js');
var util = require('./util.js');

module.exports = {
  start: function(options, forPhantom) {
    var parentScriptRoot = path.dirname(module.parent.parent.filename);
    var clientRoot = options.root || parentScriptRoot;
    var runnerRoot = path.join(__dirname, 'runner');
    var jasmineRoot = path.join(__dirname, '..', 'vendor', 'jasmine-2.0.1');

    this.runnerOptions = {
      globbedFiles: util.globValues(options.files, clientRoot),
      showColors: _.isUndefined(options.showColors) ? true : options.showColors
    };

    this._updateSpecRunner(forPhantom);

    if (!forPhantom) {
      this.watcher = util.watchFiles(
        options.files, clientRoot,
        this.runnerOptions,
        options.updateInterval || 1000,
        _.bind(this._updateSpecRunner, this)
      );
    }

    var app = connect()
      .use('/', _.bind(function(req, res, next) {
        if (!req.url.match(/^\/(\?.*)?$/)) {
          next();
        } else {
          res.writeHead(200, {"Context-Type": "text/html"});
          res.end(this.specRunner);
        }
      }, this))
      .use('/jasmine', connect.static(jasmineRoot))
      .use('/runner', connect.static(runnerRoot))
      .use('/app', connect.static(clientRoot));

    this.server = http.createServer(app);
    this.server.listen(options.port || 8888, 'localhost');
  },

  stop: function() {
    clearInterval(this.watcher);
    this.server.close();
  },

  run: function(options) {
    this.start(options, true);

    phantom(options.port || 8888,
      _.bind(this.stop, this),
      options.testOutput,
      options.phantomOutput
    );
  },

  _updateSpecRunner: function(forPhantom) {
    this.specRunner = util.buildSpecRunner(
      this.runnerOptions.globbedFiles,
      this.runnerOptions.showColors,
      forPhantom
    );
  }
};
