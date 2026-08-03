import { app, BrowserWindow, ipcMain, session, dialog, Tray, Menu, nativeImage } from 'electron';
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
  getLastSeenVersion,
  setLastSeenVersion,
  getLowPowerMode,
  setLowPowerMode,
} from './store';
import { isFiveMInstalled, resolveFiveMPath } from './fivemLocator';
import { connectToServer, openFiveMDownloadPage, openDiscord, openTiktok, isFiveMRunning, closeFiveM } from './launcher';
import { fetchServerStatus } from './serverStatus';
import { fetchNews } from './news';
import { initAutoUpdater, installUpdateNow, checkForUpdatesManually } from './updater';
import { clearFiveMCache } from './cacheCleaner';

const STATUS_POLL_INTERVAL_MS = 30_000;
const GITHUB_OWNER = 'Xexelevrai';
const GITHUB_REPO = 'Lunaria-App';

const config = loadServerConfig();
let mainWindow: BrowserWindow | null = null;
let statusInterval: NodeJS.Timeout | null = null;
let tray: Tray | null = null;

function resolveIconPath(): string {
  // build/icon.ico n'est PAS embarqué dans l'app.asar : c'est un fichier extraResources
  // (copié à côté de resources/), le chemin doit donc différer entre dev et packagé,
  // comme pour resolveAssetsBase() ci-dessous.
  return app.isPackaged
    ? path.join(process.resourcesPath, 'build', 'icon.ico')
    : path.join(app.getAppPath(), 'build', 'icon.ico');
}

function createTray(): void {
  const icon = nativeImage.createFromPath(resolveIconPath());
  tray = new Tray(icon);
  tray.setToolTip('Lunaria Launcher');
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Lunaria Launcher', enabled: false },
      { type: 'separator' },
      {
        label: 'Redémarrer',
        click: () => {
          app.relaunch();
          app.quit();
        },
      },
      { label: 'Quitter', click: () => app.quit() },
    ])
  );
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

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
    icon: resolveIconPath(),
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

async function getWhatsNewIfAny(): Promise<{ version: string; notes: string } | null> {
  // Pas de vraies releases GitHub en dev (pas de provider configuré) - éviter le
  // popup à chaque changement de version locale pendant le développement.
  if (!app.isPackaged) return null;

  const currentVersion = app.getVersion();
  const lastSeen = getLastSeenVersion();

  // Première installation, ou déjà vue : on mémorise la version sans popup
  // (rien de "nouveau" à annoncer pour une première ouverture ou un simple relancement).
  if (lastSeen === null || lastSeen === currentVersion) {
    setLastSeenVersion(currentVersion);
    return null;
  }

  setLastSeenVersion(currentVersion);

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/v${currentVersion}`);
    if (!res.ok) return { version: currentVersion, notes: '' };
    const data = (await res.json()) as { body?: string };
    return { version: currentVersion, notes: typeof data.body === 'string' ? data.body : '' };
  } catch (err) {
    console.error('[whatsNew] Impossible de récupérer les notes de version', err);
    return { version: currentVersion, notes: '' };
  }
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
      lowPowerMode: getLowPowerMode(),
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

  ipcMain.handle('settings:setLowPowerMode', (_event, value: boolean) => {
    setLowPowerMode(Boolean(value));
    return getLowPowerMode();
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
    const alreadyRunning = await isFiveMRunning();
    await connectToServer(config);
    return { installed: true, alreadyRunning };
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

  ipcMain.handle('cache:isFiveMRunning', () => isFiveMRunning());

  ipcMain.handle('cache:clear', () => clearFiveMCache());

  ipcMain.handle('cache:closeFiveMAndClear', async () => {
    await closeFiveM();
    // Laisse le temps à Windows de libérer les handles de fichiers après la fermeture.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return clearFiveMCache();
  });

  ipcMain.handle('app:quit', () => {
    app.quit();
  });

  ipcMain.handle('update:install', () => {
    installUpdateNow();
  });

  ipcMain.handle('update:check', () => {
    checkForUpdatesManually();
  });

  ipcMain.handle('app:getWhatsNew', () => getWhatsNewIfAny());
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
  createTray();
  initAutoUpdater(() => mainWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
