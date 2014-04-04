var page = require('webpage').create();
var _ = require('underscore');
var fs = require('fs');

function stdout(str) {
  fs.write('/dev/stdout', str, 'w')
}

function stderr(str) {
  fs.write('/dev/stderr', str, 'w')
}

page.onAlert = stdout;
page.onConsoleMessage = stdout;
page.onError = stderr;

page.onLoadFinished = function() {
  phantom.exit();
};

page.open(phantom.args[0]);
