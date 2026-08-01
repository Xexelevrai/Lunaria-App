import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

export type UpdateStatus =
  | { state: 'checking' }
  | { state: 'available'; version: string }
  | { state: 'not-available' }
  | { state: 'downloading'; percent: number }
  | { state: 'downloaded'; version: string }
  | { state: 'error' };

let windowGetter: () => BrowserWindow | null = () => null;

function sendStatus(status: UpdateStatus): void {
  const win = windowGetter();
  if (win) win.webContents.send('update:status', status);
}

export function initAutoUpdater(getWindow: () => BrowserWindow | null): void {
  windowGetter = getWindow;

  if (!app.isPackaged) {
    // Pas de vérification de mise à jour en développement (pas de provider configuré).
    return;
  }

  autoUpdater.logger = console;
  autoUpdater.autoDownload = true;

  autoUpdater.on('checking-for-update', () => sendStatus({ state: 'checking' }));
  autoUpdater.on('update-available', (info) => sendStatus({ state: 'available', version: info.version }));
  autoUpdater.on('update-not-available', () => sendStatus({ state: 'not-available' }));
  autoUpdater.on('download-progress', (progress) => sendStatus({ state: 'downloading', percent: Math.round(progress.percent) }));
  autoUpdater.on('update-downloaded', (info) => sendStatus({ state: 'downloaded', version: info.version }));
  autoUpdater.on('error', (err) => {
    console.error('[updater] Erreur de mise à jour', err);
    sendStatus({ state: 'error' });
  });

  autoUpdater.checkForUpdates().catch((err) => {
    console.error('[updater] Vérification de mise à jour impossible', err);
  });
}

export function installUpdateNow(): void {
  autoUpdater.quitAndInstall();
}

export function checkForUpdatesManually(): void {
  if (!app.isPackaged) {
    // Pas de provider configuré en dev : on simule une réponse pour que le bouton
    // "Vérifier les mises à jour" des Paramètres ait un retour visuel cohérent.
    sendStatus({ state: 'not-available' });
    return;
  }

  autoUpdater.checkForUpdates().catch((err) => {
    console.error('[updater] Vérification manuelle impossible', err);
    sendStatus({ state: 'error' });
  });
}
