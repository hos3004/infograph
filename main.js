const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const http = require('http');
const { fork } = require('child_process');
const fs = require('fs');

let mainWindow;
let nextProcess;

// ── Dynamic Path Resolution ────────────────────────────────────────────────
// When packed, the .exe sits inside a root folder. We want Assets, Output and temp there.
const isPackaged = app.isPackaged;
const APP_HOME = isPackaged 
  ? path.dirname(app.getPath('exe')) 
  : process.cwd();

const ASSETS_DIR = path.join(APP_HOME, 'Assets');
const OUTPUT_DIR = path.join(APP_HOME, 'Outputs');
const TEMP_DIR   = path.join(APP_HOME, 'Temp');

// Ensure directories exist
[ASSETS_DIR, OUTPUT_DIR, TEMP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Setup some defaults in Assets if empty
['overlays', 'music', 'endpage', 'fonts'].forEach(sub => {
  const subPath = path.join(ASSETS_DIR, sub);
  if (!fs.existsSync(subPath)) fs.mkdirSync(subPath, { recursive: true });
});

async function findFreePort() {
  return new Promise((resolve, reject) => {
    const srv = http.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

function waitForServer(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for Next.js server'));
      }
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      }).on('error', () => { /* ignore */ });
    }, 500);
  });
}

async function startNextSrv() {
  const port = await findFreePort();
  const url = `http://localhost:${port}`;
  
  // Standalone Next.js entry
  const serverPath = isPackaged
    ? path.join(process.resourcesPath, 'next-server', 'server.js')
    : path.join(__dirname, '.next', 'standalone', 'server.js'); // During dev, we let Next.js run normally if we wanted, but let's assume we run dev differently.
  
  if (!fs.existsSync(serverPath) && isPackaged) {
    dialog.showErrorBox('Error', `Cannot find server file at ${serverPath}`);
    app.quit();
  }

  nextProcess = fork(serverPath, [], {
    cwd: isPackaged ? path.dirname(serverPath) : process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: port.toString(),
      APP_HOME,
      ASSETS_DIR,
      OUTPUT_DIR,
      TEMP_DIR,
      NEXT_SERVER_DIR: isPackaged ? path.dirname(serverPath) : process.cwd(),
    },
    stdio: 'pipe'
  });

  // Capture Next.js errors to log file
  nextProcess.stderr.on('data', (data) => {
    fs.appendFileSync(path.join(APP_HOME, 'error.log'), data.toString());
  });
  nextProcess.stdout.on('data', (data) => {
    fs.appendFileSync(path.join(APP_HOME, 'server.log'), data.toString());
  });
  nextProcess.on('error', (err) => {
    fs.appendFileSync(path.join(APP_HOME, 'error.log'), 'Process Error: ' + err.toString());
  });

  return { port, url };
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  try {
    let url = 'http://localhost:3000';
    if (isPackaged || process.env.RUN_STANDALONE) {
      console.log('Starting internal Next server...');
      const srv = await startNextSrv();
      url = srv.url;
      console.log(`Waiting for server at ${url}...`);
      await waitForServer(url);
    } else {
      // In dev mode just rely on external Next.js server running
      await waitForServer(url, 2000).catch(() => {
        console.log('Ensure you are running Next.js dev server on :3000');
      });
    }

    mainWindow.loadURL(url);
  } catch (error) {
    dialog.showErrorBox('Error', 'Failed to start local server: ' + error.message);
    app.quit();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (nextProcess) nextProcess.kill();
});
