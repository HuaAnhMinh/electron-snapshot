if (typeof snapshotResult !== 'undefined') {
  snapshotResult.setGlobals(global, process, global, {}, console, require);
  const snapshotModule = snapshotResult.customRequire('./startup.js');
  console.log(snapshotModule.methodInTheSnapshot);
}

const { app } = require('electron');

app.quit();