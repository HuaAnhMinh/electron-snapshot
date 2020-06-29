if (typeof snapshotResult !== 'undefined') {
  snapshotResult.setGlobals(global, process, global, {}, console, require);
  const snapshotMethod = snapshotResult.customRequire('./startup.js');
  console.log(snapshotMethod);
}

const { app } = require('electron');

app.quit();