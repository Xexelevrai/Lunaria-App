import { ServerConfig } from './config';

export interface ServerStatus {
  online: boolean;
  playerCount: number;
  maxPlayers: number;
  serverName: string | null;
}

const FETCH_TIMEOUT_MS = 5000;

async function fetchJson(url: string): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchServerStatus(config: ServerConfig): Promise<ServerStatus> {
  try {
    const [info, players] = await Promise.all([
      fetchJson(`${config.statusBaseUrl}/info.json`),
      fetchJson(`${config.statusBaseUrl}/players.json`),
    ]);

    const maxPlayers = Number(info?.vars?.sv_maxClients ?? 0);
    const playerCount = Array.isArray(players) ? players.length : 0;
    const rawName = info?.vars?.sv_projectName ?? info?.hostname ?? null;
    const serverName = typeof rawName === 'string' ? rawName.replace(/\^[0-9]/g, '') : rawName;

    return { online: true, playerCount, maxPlayers, serverName };
  } catch (err) {
    return { online: false, playerCount: 0, maxPlayers: 0, serverName: null };
  }
}
