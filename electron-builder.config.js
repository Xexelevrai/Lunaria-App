const pkg = require('./package.json');

// IMPORTANT : executableName reste constant ("Lunaria Launcher"), sans le numéro de version.
// On a testé le contraire (nom versionné) et ça casse la détection de mise à jour de NSIS :
// au lieu d'écraser l'installation existante, il imbrique une nouvelle install dedans, créant
// exactement les doublons qu'on veut éviter. Le fichier d'installation téléchargé (le "Setup"
// lui-même, ex: "Lunaria Launcher Setup 1.1.0.exe") affiche déjà la version dans son nom via
// artifactName (comportement par défaut d'electron-builder) - largement suffisant, et l'appli
// affiche aussi sa version dans les Paramètres.
module.exports = {
  appId: 'com.lunaria.launcher',
  productName: 'Lunaria Launcher',
  executableName: 'Lunaria Launcher',
  directories: {
    output: 'release',
  },
  files: ['dist/**/*', 'src/renderer/**/*'],
  extraResources: [
    { from: 'config', to: 'config' },
    { from: 'assets', to: 'assets' },
  ],
  win: {
    target: 'nsis',
    icon: 'build/icon.ico',
  },
  nsis: {
    // Mode assisté (pas oneClick) pour que l'installeur propose la case "créer un raccourci
    // sur le bureau" (cochée par défaut, décochable). On NE propose PAS de choisir le dossier
    // d'installation (allowToChangeInstallationDirectory reste à false, la valeur par défaut) :
    // le chemin reste toujours le même, donc NSIS retrouve et met à jour la même installation
    // à chaque nouvelle version, sans jamais créer de doublon.
    oneClick: false,
    createDesktopShortcut: true,
    runAfterFinish: true,
  },
  publish: {
    provider: 'github',
    owner: 'Xexelevrai',
    repo: 'Lunaria-App',
  },
};
