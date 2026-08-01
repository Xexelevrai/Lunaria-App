import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

export interface ServerConfig {
  cfxCode: string;
  connectFallback: string;
  statusBaseUrl: string;
  newsUrl: string;
  discordUrl: string;
}

const DEFAULT_CONFIG: ServerConfig = {
  cfxCode: 'e6eb3xd',
  connectFallback: '162.19.126.62:30121',
  statusBaseUrl: 'http://162.19.126.62:30121',
  newsUrl: '',
  discordUrl: 'https://discord.gg/BfuCxJquRw',
};

function resolveConfigPath(): string {
  // Packaged app: config/ is copied next to the executable via extraResources.
  // Dev mode: config/ lives at the project root.
  const packagedPath = path.join(process.resourcesPath, 'config', 'server.json');
  const devPath = path.join(app.getAppPath(), 'config', 'server.json');
  return app.isPackaged ? packagedPath : devPath;
}

export function loadServerConfig(): ServerConfig {
  try {
    const configPath = resolveConfigPath();
    const raw = fs.readFileSync(configPath, 'utf-8');
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (err) {
    console.error('[config] Impossible de charger config/server.json, utilisation des valeurs par défaut.', err);
    return DEFAULT_CONFIG;
  }
}
