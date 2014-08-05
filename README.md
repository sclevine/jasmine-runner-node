jasmine-runner-node
====================
 - Run Jasmine 2 specs with (or without) PhantomJS
 - Compatible with any task runner
 - Doesn't generate temporary spec runner files
 - Doesn't require an external phantom installation
 - Detects added/removed spec/js/css files
 - Perfect for use with [gulp.js](http://gulpjs.com/)

Installation
============
In your project root, run: `npm install jasmine-runner-node --save-dev`

Usage
=====
``` javascript
var jasmine = require('jasmine-runner-node');

// start server
jasmine.start({
  root: <dir>,          // project root (default: client module root)
  updateInterval: <ms>, // how often to check for file changes (default: 1000)
  port: <num>,          // port number to serve jasmine on (default: 8888)
  files: {              // (in order of spec runner inclusion)
    css: <file glob or glob list>,
    specHelper: <file glob or glob list>,
    js: <file glob or glob list>,
    spec: <file glob or glob list>,
    other: <file glob or glob list>
  }
});

// stop server
jasmine.stop()

// start server, run phantom, stop server
// (also takes all of the above, except updateInterval)
jasmine.run({
  showColors: <bool>,      // colorize phantomjs output (default: true)
  testOutput: <stream>,    // stream for test report output (default: stdout)
  phantomOutput: <stream>, // stream for phantom output (default: stderr)
});

```

Testing
=======
Run `npm test` :)
