var page = require('webpage').create();
var _ = require('underscore');
var system = require('system');

page.onAlert = system.stdout.write;
page.onConsoleMessage = system.stdout.write;
page.onError = system.stderr.write;

page.onLoadFinished = function() {
  // Wait for I/O to complete
  setTimeout(function() {
    phantom.exit(0);
  }, 100);
};

page.open(phantom.args[0]);
