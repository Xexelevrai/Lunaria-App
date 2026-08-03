import { contextBridge, ipcRenderer } from 'electron';

interface BootData {
  assetsBase: string;
  introEnabled: boolean;
  theme: string;
  musicVolume: number;
  musicMuted: boolean;
  lowPowerMode: boolean;
}

// Résolu de façon synchrone (avant même le premier paint) pour que le thème, le logo
// et la vidéo d'intro soient corrects dès la première image affichée - un aller-retour
// IPC async ici causerait un flash visible de la mauvaise vue/du mauvais thème.
const bootData: BootData = ipcRenderer.sendSync('app:getBootData');

const api = {
  bootData,
  getInit: () => ipcRenderer.invoke('app:init'),
  setIntroEnabled: (value: boolean) => ipcRenderer.invoke('settings:setIntroEnabled', value),
  setAutoLaunch: (value: boolean) => ipcRenderer.invoke('settings:setAutoLaunch', value),
  setAutoConnect: (value: boolean) => ipcRenderer.invoke('settings:setAutoConnect', value),
  setTheme: (value: string) => ipcRenderer.invoke('settings:setTheme', value),
  setDisplayMode: (value: string) => ipcRenderer.invoke('settings:setDisplayMode', value),
  setMusicVolume: (value: number) => ipcRenderer.invoke('settings:setMusicVolume', value),
  setMusicMuted: (value: boolean) => ipcRenderer.invoke('settings:setMusicMuted', value),
  setLowPowerMode: (value: boolean) => ipcRenderer.invoke('settings:setLowPowerMode', value),
  chooseFiveMPath: () => ipcRenderer.invoke('settings:chooseFiveMPath'),
  play: () => ipcRenderer.invoke('launcher:play'),
  openDownload: () => ipcRenderer.invoke('launcher:openDownload'),
  openDiscord: () => ipcRenderer.invoke('launcher:openDiscord'),
  openTiktok: () => ipcRenderer.invoke('launcher:openTiktok'),
  getNews: () => ipcRenderer.invoke('news:get'),
  isFiveMRunning: () => ipcRenderer.invoke('cache:isFiveMRunning'),
  clearFiveMCache: () => ipcRenderer.invoke('cache:clear'),
  closeFiveMAndClearCache: () => ipcRenderer.invoke('cache:closeFiveMAndClear'),
  quit: () => ipcRenderer.invoke('app:quit'),
  installUpdate: () => ipcRenderer.invoke('update:install'),
  checkForUpdates: () => ipcRenderer.invoke('update:check'),
  getWhatsNew: () => ipcRenderer.invoke('app:getWhatsNew'),
  onStatusUpdate: (callback: (status: unknown) => void) => {
    ipcRenderer.on('status:update', (_event, status) => callback(status));
  },
  onUpdateStatus: (callback: (status: unknown) => void) => {
    ipcRenderer.on('update:status', (_event, status) => callback(status));
  },
};

contextBridge.exposeInMainWorld('lunaria', api);

export type LunariaApi = typeof api;
