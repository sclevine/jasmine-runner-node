var page = require('webpage').create();
var _ = require('underscore');
var system = require('system');

page.onAlert = system.stdout.write;
page.onConsoleMessage = system.stdout.write;
page.onError = system.stderr.write;

page.onLoadFinished = function() {
  phantom.exit(0);
};

page.open(phantom.args[0]);
