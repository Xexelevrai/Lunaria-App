import * as fs from 'fs';
import * as path from 'path';
import { getFiveMPathOverride } from './store';

const CANDIDATE_PATHS = [
  path.join(process.env.LOCALAPPDATA || '', 'FiveM', 'FiveM.exe'),
  path.join(process.env.LOCALAPPDATA || '', 'FiveM', 'FiveM.app', 'FiveM.exe'),
];

export function resolveFiveMPath(): string | null {
  const override = getFiveMPathOverride();
  if (override && fs.existsSync(override)) {
    return override;
  }

  for (const candidate of CANDIDATE_PATHS) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function isFiveMInstalled(): boolean {
  return resolveFiveMPath() !== null;
}
