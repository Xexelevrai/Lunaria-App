import { app, BrowserWindow, ipcMain, session, dialog } from 'electron';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { loadServerConfig } from './config';
import {
  getIntroEnabled,
  setIntroEnabled,
  getFiveMPathOverride,
  setFiveMPathOverride,
  getAutoLaunch,
  setAutoLaunch,
  getAutoConnect,
  setAutoConnect,
  getTheme,
  setTheme,
  ThemeName,
  getDisplayMode,
  setDisplayMode,
  DisplayMode,
  getMusicVolume,
  setMusicVolume,
  getMusicMuted,
  setMusicMuted,
} from './store';
import { isFiveMInstalled, resolveFiveMPath } from './fivemLocator';
import { connectToServer, openFiveMDownloadPage, openDiscord, openTiktok } from './launcher';
import { fetchServerStatus } from './serverStatus';
import { fetchNews } from './news';
import { initAutoUpdater } from './updater';

const STATUS_POLL_INTERVAL_MS = 30_000;

const config = loadServerConfig();
let mainWindow: BrowserWindow | null = null;
let statusInterval: NodeJS.Timeout | null = null;

function resolveAssetsBase(): string {
  // En dev, assets/ vit à la racine du projet. En packagé, il est copié à côté de
  // resources/ (extraResources) plutôt que dans l'app.asar, pour rester remplaçable
  // après installation - le calcul du chemin doit donc différer selon le contexte.
  const assetsDir = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(app.getAppPath(), 'assets');
  return pathToFileURL(assetsDir).href;
}

function applyDisplayMode(win: BrowserWindow, mode: DisplayMode): void {
  switch (mode) {
    case 'fullscreen':
      win.setFullScreen(true);
      break;
    case 'maximized':
      win.setFullScreen(false);
      win.maximize();
      break;
    case 'windowed':
      win.setFullScreen(false);
      win.unmaximize();
      win.setSize(1280, 800);
      win.center();
      break;
  }
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    resizable: true,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#08050f',
    icon: path.join(__dirname, '..', '..', 'build', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  applyDisplayMode(mainWindow, getDisplayMode());
  mainWindow.once('ready-to-show', () => mainWindow?.show());

  mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'renderer', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (statusInterval) clearInterval(statusInterval);
  });

  startStatusPolling();
}

function startStatusPolling(): void {
  const pushStatus = async () => {
    if (!mainWindow) return;
    const status = await fetchServerStatus(config);
    mainWindow.webContents.send('status:update', status);
  };

  pushStatus();
  statusInterval = setInterval(pushStatus, STATUS_POLL_INTERVAL_MS);
}

function registerIpcHandlers(): void {
  // Résolu de façon synchrone : le thème, la vidéo d'intro et le logo doivent être
  // corrects dès la toute première image affichée, sans attendre un aller-retour IPC
  // async (sinon on voit un flash de la mauvaise vue/du mauvais thème le temps que
  // la réponse arrive).
  ipcMain.on('app:getBootData', (event) => {
    event.returnValue = {
      assetsBase: resolveAssetsBase(),
      introEnabled: getIntroEnabled(),
      theme: getTheme(),
      musicVolume: getMusicVolume(),
      musicMuted: getMusicMuted(),
    };
  });

  ipcMain.handle('app:init', () => ({
    appVersion: app.getVersion(),
    autoLaunch: getAutoLaunch(),
    autoConnect: getAutoConnect(),
    fivemPath: resolveFiveMPath(),
    displayMode: getDisplayMode(),
    config: {
      cfxCode: config.cfxCode,
      connectFallback: config.connectFallback,
    },
  }));

  ipcMain.handle('settings:setIntroEnabled', (_event, value: boolean) => {
    setIntroEnabled(Boolean(value));
    return getIntroEnabled();
  });

  ipcMain.handle('settings:setAutoLaunch', (_event, value: boolean) => {
    const enabled = Boolean(value);
    setAutoLaunch(enabled);
    app.setLoginItemSettings({ openAtLogin: enabled });
    return getAutoLaunch();
  });

  ipcMain.handle('settings:setAutoConnect', (_event, value: boolean) => {
    setAutoConnect(Boolean(value));
    return getAutoConnect();
  });

  ipcMain.handle('settings:setTheme', (_event, value: ThemeName) => {
    setTheme(value);
    return getTheme();
  });

  ipcMain.handle('settings:setDisplayMode', (_event, value: DisplayMode) => {
    setDisplayMode(value);
    if (mainWindow) applyDisplayMode(mainWindow, value);
    return getDisplayMode();
  });

  ipcMain.handle('settings:setMusicVolume', (_event, value: number) => {
    setMusicVolume(Number(value));
    return getMusicVolume();
  });

  ipcMain.handle('settings:setMusicMuted', (_event, value: boolean) => {
    setMusicMuted(Boolean(value));
    return getMusicMuted();
  });

  ipcMain.handle('settings:chooseFiveMPath', async () => {
    if (!mainWindow) return resolveFiveMPath();
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Sélectionner FiveM.exe',
      properties: ['openFile'],
      filters: [{ name: 'FiveM', extensions: ['exe'] }],
    });
    if (!result.canceled && result.filePaths[0]) {
      setFiveMPathOverride(result.filePaths[0]);
    }
    return resolveFiveMPath();
  });

  ipcMain.handle('launcher:play', async () => {
    const installed = isFiveMInstalled();
    if (!installed) {
      return { installed: false };
    }
    await connectToServer(config);
    return { installed: true };
  });

  ipcMain.handle('launcher:openDownload', async () => {
    await openFiveMDownloadPage();
  });

  ipcMain.handle('launcher:openDiscord', async () => {
    await openDiscord(config);
  });

  ipcMain.handle('launcher:openTiktok', async () => {
    await openTiktok(config);
  });

  ipcMain.handle('news:get', async () => {
    return fetchNews(config);
  });

  ipcMain.handle('app:quit', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  // Content-Security-Policy stricte : pas de scripts distants, tout est local (hors polices Google Fonts).
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; media-src 'self' file:; img-src 'self' file: data:;",
        ],
      },
    });
  });

  // Synchronise le lancement automatique Windows avec la préférence sauvegardée.
  app.setLoginItemSettings({ openAtLogin: getAutoLaunch() });

  registerIpcHandlers();
  createWindow();
  initAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
