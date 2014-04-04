var child_process = require('child_process');
var path = require('path');
var phantomjs = require('phantomjs');
var _ = require('underscore');

module.exports = function(port, done, testOut, phantomOut) {
  var phantomBin = phantomjs.path;

  var host = 'http://localhost:' + port;
  var args = ['run_phantom.js', host];
  var runnerDir = path.join(__dirname, 'runner');
  var phantomProc = child_process.spawn(phantomBin, args, { cwd: runnerDir });

  var out = testOut || process.stdout;
  var err = phantomOut || process.stderr;
  done = done || function() {};

  phantomProc.stdout.setEncoding('utf8');
  phantomProc.stdout.on('data', _.bind(out.write, out));

  phantomProc.stderr.setEncoding('utf8');
  phantomProc.stderr.on('data', _.bind(err.write, err));

  phantomProc.on('close', function(code) {
    switch (code) {
      case 0:
      case 15:
        break;
      case 127:
        err.write('PhantomJS could not be found.');
        break;
      default:
        out.write('PhantomJS quit with code ' + code + '.');
    }

    done(code);
  });
};

