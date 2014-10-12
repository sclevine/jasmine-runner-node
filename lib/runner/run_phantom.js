var page = require('webpage').create();
var _ = require('underscore');
var system = require('system');

page.onAlert = system.stdout.write;
page.onConsoleMessage = system.stdout.write;
page.onError = system.stderr.write;

page.onClosing = function(closingPage) {
  var status = closingPage.evaluate(function() {
    return window._phantom.jasminePassed ? 0 : 1;
  });

  _.defer(function() {
    phantom.exit(status);
  });
};

page.open(phantom.args[0]);
