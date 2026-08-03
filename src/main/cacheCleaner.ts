import * as fs from 'fs';
import * as path from 'path';
import { resolveFiveMPath } from './fivemLocator';

// Dossiers de cache FiveM, relatifs au dossier contenant FiveM.exe (ex: .../FiveM/FiveM.app/).
// `citizen/` (le client FiveM lui-même) n'en fait volontairement pas partie.
const DATA_CACHE_FOLDERS = ['cache', 'nui-storage', 'server-cache', 'server-cache-priv'];
const APP_CACHE_FOLDERS = ['crashes', 'logs'];

export interface ClearCacheResult {
  fivemFound: boolean;
  cleared: string[];
  failed: string[];
}

// Certaines installs ont un FiveM.exe "raccourci" directement dans .../FiveM/ en plus du
// vrai client dans .../FiveM/FiveM.app/ - resolveFiveMPath() peut renvoyer l'un ou
// l'autre. On part du dossier du .exe résolu, mais si son sous-dossier data/ n'existe
// pas, on retente dans un éventuel sous-dossier FiveM.app/ à côté.
function resolveAppDir(exePath: string): string | null {
  const exeDir = path.dirname(exePath);
  if (fs.existsSync(path.join(exeDir, 'data'))) {
    return exeDir;
  }
  const nested = path.join(exeDir, 'FiveM.app');
  if (fs.existsSync(path.join(nested, 'data'))) {
    return nested;
  }
  return null;
}

export function clearFiveMCache(): ClearCacheResult {
  const exePath = resolveFiveMPath();
  if (!exePath) {
    return { fivemFound: false, cleared: [], failed: [] };
  }

  const appDir = resolveAppDir(exePath);
  if (!appDir) {
    return { fivemFound: true, cleared: [], failed: [] };
  }

  const targets = [
    ...DATA_CACHE_FOLDERS.map((name) => path.join(appDir, 'data', name)),
    ...APP_CACHE_FOLDERS.map((name) => path.join(appDir, name)),
  ];

  const cleared: string[] = [];
  const failed: string[] = [];
  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    try {
      fs.rmSync(target, { recursive: true, force: true });
      cleared.push(target);
    } catch {
      failed.push(target);
    }
  }

  return { fivemFound: true, cleared, failed };
}
