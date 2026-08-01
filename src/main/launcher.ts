import { shell } from 'electron';
import { spawn, exec } from 'child_process';
import { ServerConfig } from './config';
import { resolveFiveMPath } from './fivemLocator';

export function isFiveMRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    exec('tasklist /FI "IMAGENAME eq FiveM.exe" /NH', (err, stdout) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(stdout.toLowerCase().includes('fivem.exe'));
    });
  });
}

export async function connectToServer(config: ServerConfig): Promise<boolean> {
  const exePath = resolveFiveMPath();
  if (!exePath) return false;

  // Vérifié par logs CitizenFX : un spawn direct (avec fivem://... ou +connect ip:port)
  // est rejeté par FiveM après l'authentification Rockstar ("should be launched directly
  // from the shell or a web browser"), quel que soit le format d'argument. Faire résoudre
  // le lien par explorer.exe (comme un clic dans un navigateur) passe ce contrôle et fait
  // parvenir la cible de connexion jusqu'au processus de jeu.
  const child = spawn('explorer.exe', [`fivem://connect/${config.connectFallback}`], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  return true;
}

export async function openFiveMDownloadPage(): Promise<void> {
  await shell.openExternal('https://fivem.net/');
}

export async function openDiscord(config: ServerConfig): Promise<void> {
  await shell.openExternal(config.discordUrl);
}

export async function openTiktok(config: ServerConfig): Promise<void> {
  await shell.openExternal(config.tiktokUrl);
}
