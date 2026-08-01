import Store from 'electron-store';

export type ThemeName = 'gold' | 'silver';
export type DisplayMode = 'fullscreen' | 'maximized' | 'windowed';

interface StoreSchema {
  introEnabled: boolean;
  fivemPathOverride: string | null;
  autoLaunch: boolean;
  autoConnect: boolean;
  theme: ThemeName;
  displayMode: DisplayMode;
  musicVolume: number;
  musicMuted: boolean;
  lastSeenVersion: string | null;
  lowPowerMode: boolean;
}

const store = new Store<StoreSchema>({
  defaults: {
    introEnabled: true,
    fivemPathOverride: null,
    autoLaunch: false,
    autoConnect: false,
    theme: 'gold',
    displayMode: 'fullscreen',
    musicVolume: 25,
    musicMuted: false,
    lastSeenVersion: null,
    lowPowerMode: false,
  },
});

// Seule source de vérité pour "faut-il jouer la vidéo au démarrage" : à la fois le
// toggle des paramètres et la case "ne plus afficher" de la vidéo agissent dessus.
export function getIntroEnabled(): boolean {
  return store.get('introEnabled');
}

export function setIntroEnabled(value: boolean): void {
  store.set('introEnabled', value);
}

export function getFiveMPathOverride(): string | null {
  return store.get('fivemPathOverride');
}

export function setFiveMPathOverride(value: string | null): void {
  store.set('fivemPathOverride', value);
}

export function getAutoLaunch(): boolean {
  return store.get('autoLaunch');
}

export function setAutoLaunch(value: boolean): void {
  store.set('autoLaunch', value);
}

// Distinct de autoLaunch : celui-ci contrôle si le launcher se connecte tout seul
// après un court délai annulable, une fois affiché - jamais sans montrer sa fenêtre.
export function getAutoConnect(): boolean {
  return store.get('autoConnect');
}

export function setAutoConnect(value: boolean): void {
  store.set('autoConnect', value);
}

export function getTheme(): ThemeName {
  return store.get('theme');
}

export function setTheme(value: ThemeName): void {
  store.set('theme', value);
}

export function getDisplayMode(): DisplayMode {
  return store.get('displayMode');
}

export function setDisplayMode(value: DisplayMode): void {
  store.set('displayMode', value);
}

export function getMusicVolume(): number {
  return store.get('musicVolume');
}

export function setMusicVolume(value: number): void {
  store.set('musicVolume', Math.min(100, Math.max(0, value)));
}

export function getMusicMuted(): boolean {
  return store.get('musicMuted');
}

export function setMusicMuted(value: boolean): void {
  store.set('musicMuted', value);
}

export function getLastSeenVersion(): string | null {
  return store.get('lastSeenVersion');
}

export function setLastSeenVersion(value: string): void {
  store.set('lastSeenVersion', value);
}

export function getLowPowerMode(): boolean {
  return store.get('lowPowerMode');
}

export function setLowPowerMode(value: boolean): void {
  store.set('lowPowerMode', value);
}
