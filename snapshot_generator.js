const path = require('path');
const fs = require('fs');
const vm = require('vm');
const cp = require('child_process');
const electronLink = require('electron-link');

function deleteFolder(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.readdirSync(targetPath).forEach((file, index) => {
      const curPath = path.join(targetPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      }
      else {
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(targetPath);
  }
}

async function generateSnapshot() {
  const snapshotScriptPath = path.join(__dirname, process.argv[3], 'snapshot.js');
  let snapshotScript;

  if (process.argv[2] === 'has-link') {
    deleteFolder(path.join(__dirname, process.argv[3], '/cache'));

    snapshotScript = await electronLink({
      baseDirPath: __dirname,
      mainPath: path.join(__dirname, process.argv[3], process.argv[4]),
      cachePath: path.join(__dirname, process.argv[3], '/cache'),
      shouldExcludeModule: modulePath => false
    });
    snapshotScript = snapshotScript.snapshotScript;

    fs.writeFileSync(snapshotScriptPath, snapshotScript);
    process.stdout.write('\n');
  }
  else {
    snapshotScript = fs.readFileSync(snapshotScriptPath).toString();
  }

  vm.runInNewContext(snapshotScript, undefined, { filename: snapshotScriptPath, displayErrors: true });
  let binaryPath;

  if (process.platform === 'darwin') {
    binaryPath = path.join(__dirname, '/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Resources')
  }
  else {
    binaryPath = path.join(__dirname, '/node_modules/electron/dist');
  }

  cp.spawnSync(process.execPath, [
    path.join(__dirname, '/node_modules/electron-mksnapshot/mksnapshot.js'),
    snapshotScriptPath, '--output_dir', binaryPath
  ]);
}

generateSnapshot();