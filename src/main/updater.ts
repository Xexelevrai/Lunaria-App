import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

export type UpdateStatus =
  | { state: 'checking' }
  | { state: 'available'; version: string }
  | { state: 'not-available' }
  | { state: 'downloading'; percent: number }
  | { state: 'downloaded'; version: string }
  | { state: 'error' };

function sendStatus(getWindow: () => BrowserWindow | null, status: UpdateStatus): void {
  const win = getWindow();
  if (win) win.webContents.send('update:status', status);
}

export function initAutoUpdater(getWindow: () => BrowserWindow | null): void {
  if (!app.isPackaged) {
    // Pas de vérification de mise à jour en développement (pas de provider configuré).
    return;
  }

  autoUpdater.logger = console;
  autoUpdater.autoDownload = true;

  autoUpdater.on('checking-for-update', () => sendStatus(getWindow, { state: 'checking' }));
  autoUpdater.on('update-available', (info) => sendStatus(getWindow, { state: 'available', version: info.version }));
  autoUpdater.on('update-not-available', () => sendStatus(getWindow, { state: 'not-available' }));
  autoUpdater.on('download-progress', (progress) =>
    sendStatus(getWindow, { state: 'downloading', percent: Math.round(progress.percent) })
  );
  autoUpdater.on('update-downloaded', (info) => sendStatus(getWindow, { state: 'downloaded', version: info.version }));
  autoUpdater.on('error', (err) => {
    console.error('[updater] Erreur de mise à jour', err);
    sendStatus(getWindow, { state: 'error' });
  });

  autoUpdater.checkForUpdates().catch((err) => {
    console.error('[updater] Vérification de mise à jour impossible', err);
  });
}

export function installUpdateNow(): void {
  autoUpdater.quitAndInstall();
}
