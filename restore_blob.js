const fs = require('fs');
const path = require('path');

try {
  if (process.platform === 'darwin') {
    if (fs.existsSync(path.join(__dirname, '/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Resources/snapshot_blob.bin'))) {
      fs.unlinkSync(path.join(__dirname, '/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Resources/snapshot_blob.bin'));
    }
    fs.copyFileSync(path.join(__dirname, '/node_modules/electron/v8_context_snapshot.bin'), path.join(__dirname, '/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Resources/v8_context_snapshot.bin'));
  }
  else {
    fs.copyFileSync(path.join(__dirname, '/node_modules/electron/snapshot_blob.bin'), path.join(__dirname, '/node_modules/electron/dist/snapshot_blob.bin'));
    fs.copyFileSync(path.join(__dirname, '/node_modules/electron/v8_context_snapshot.bin'), path.join(__dirname, '/node_modules/electron/dist/v8_context_snapshot.bin'));
  }
}
catch (error) {
  console.log(error);
}