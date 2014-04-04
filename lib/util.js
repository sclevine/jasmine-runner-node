var fs = require('fs');
var glob = require('glob');
var handlebars = require('handlebars');
var path = require('path');
var _ = require('underscore');

module.exports = {
  watchFiles: function(files, clientRoot, runnerOptions, interval, callback) {
    return setInterval(_.bind(function() {
      var globbedFiles = this.globValues(files, clientRoot);

      if (!_.isEqual(globbedFiles, runnerOptions.globbedFiles)) {
        runnerOptions.globbedFiles = globbedFiles;
        callback();
      }
    }, this), interval);
  },

  buildSpecRunner: function(files, showColors, forPhantom) {
    var templateFilename = path.join(__dirname, 'runner', 'spec_runner.html.hbs');
    var specRunnerTemplate = fs.readFileSync(templateFilename, 'utf8');

    var templateOptions = _.clone(files);
    templateOptions.showColors = showColors;
    templateOptions.forPhantom = forPhantom;
    templateOptions.phantomPrintFunction = alertWithShortStack.toString();

    return handlebars.compile(specRunnerTemplate)(templateOptions);
  },

  globValues: function(obj, root) {
    var newObj = {};

    _(obj).each(function(fileGlobs, key) {
      fileGlobs = _.isArray(fileGlobs) ? fileGlobs : [fileGlobs];
      var expandedFiles = [];
      _(fileGlobs).each(function(fileGlob) {
        expandedFiles = expandedFiles.concat(glob.sync(fileGlob, {cwd: root}));
      });
      newObj[key] = expandedFiles;
    });

    return newObj;
  }
};

function alertWithShortStack(str) {
  var endPos = str.indexOf("\n      at attemptSync");
  alert(endPos === -1 ? str : str.substr(0, endPos));
}
