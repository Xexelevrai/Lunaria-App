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

// Utilisé avant de vider le cache : les fichiers de data/ restent verrouillés tant que
// FiveM tourne. taskkill retourne dès que la fermeture est demandée, avant que les
// handles de fichiers ne soient réellement libérés par Windows - d'où le délai après.
export function closeFiveM(): Promise<void> {
  return new Promise((resolve) => {
    exec('taskkill /IM FiveM.exe /F', () => resolve());
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
  //
  // On cible le code Cfx.re (ex: e6eb3xd), pas l'IP brute (connectFallback) : une connexion
  // par IP directe force FiveM à négocier "à froid" avec le serveur sans passer par
  // l'infrastructure Cfx.re, sensiblement plus lent que la connexion via son propre
  // historique/favoris (qui utilise ce même code). connectFallback reste disponible dans
  // la config pour le statut serveur et en secours si jamais le code Cfx.re devait changer.
  const child = spawn('explorer.exe', [`fivem://connect/${config.cfxCode}`], {
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
