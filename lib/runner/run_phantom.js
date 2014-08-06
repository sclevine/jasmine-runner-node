var page = require('webpage').create();
var _ = require('underscore');
var system = require('system');

page.onAlert = system.stdout.write;
page.onError = system.stderr.write;

page.onConsoleMessage = function (msg) {
  switch (msg) {
    case 'JASMINE_TESTS_PASS':
      phantom.exit(0);
      break;
    case 'JASMINE_TESTS_FAIL':
      phantom.exit(1);
      break;
    default:
      system.stdout.write(msg);
  }
}

page.open(phantom.args[0]);
