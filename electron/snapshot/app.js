const { app, BrowserWindow } = require('electron');

let window;

app.on('ready', () => {
  window = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });
  console.log(Date.now());
  window.loadFile('./index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});