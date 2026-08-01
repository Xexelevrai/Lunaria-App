import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

export function initAutoUpdater(): void {
  if (!app.isPackaged) {
    // Pas de vérification de mise à jour en développement (pas de provider configuré).
    return;
  }

  autoUpdater.logger = console;

  autoUpdater.on('error', (err) => {
    console.error('[updater] Erreur de mise à jour', err);
  });

  autoUpdater.checkForUpdatesAndNotify().catch((err) => {
    console.error('[updater] Vérification de mise à jour impossible', err);
  });
}
