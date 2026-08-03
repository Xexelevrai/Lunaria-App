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
  // Nom de fichier de l'installeur SANS le numéro de version (contrairement au défaut
  // d'electron-builder) : ça permet d'avoir un lien de téléchargement direct fixe
  // (.../releases/latest/download/Lunaria-Launcher-Setup.exe) qui reste valide à chaque
  // nouvelle release, sans jamais avoir à le changer sur le site/la page de téléchargement.
  artifactName: 'Lunaria-Launcher-Setup.${ext}',
  directories: {
    output: 'release',
  },
  files: ['dist/**/*', 'src/renderer/**/*'],
  extraResources: [
    { from: 'config', to: 'config' },
    { from: 'assets', to: 'assets' },
    // build/icon.ico sert aussi à définir l'icône .exe à la compilation (win.icon plus bas),
    // mais ce n'est PAS le même mécanisme : sans cette entrée, le fichier n'existe pas dans
    // l'app installée et le code qui le lit au runtime (icône de fenêtre, icône du tray) échoue
    // silencieusement (icône vide dans la zone de notification).
    { from: 'build/icon.ico', to: 'build/icon.ico' },
  ],
  win: {
    target: 'nsis',
    icon: 'build/icon.ico',
  },
  nsis: {
    // Mode assisté (pas oneClick) : affiche un écran avec la case "lancer à la fin"
    // (cochée par défaut, décochable). Les raccourcis Bureau/Menu Démarrer sont créés
    // automatiquement sans case à cocher dédiée (comportement par défaut d'electron-builder,
    // comme la plupart des installeurs Electron). On NE propose PAS de choisir le dossier
    // d'installation (allowToChangeInstallationDirectory reste à false) : le chemin reste
    // toujours le même, donc NSIS retrouve et met à jour la même installation à chaque
    // nouvelle version, sans jamais créer de doublon.
    oneClick: false,
    // perMachine:false explicite (au lieu de laisser NSIS afficher l'écran de choix
    // "pour moi / tous les utilisateurs") : install toujours par utilisateur courant, sans
    // élévation UAC. Suspecté d'être la cause d'un raccourci Bureau manquant chez une
    // testeuse - "tous les utilisateurs" demande une élévation qui, refusée ou échouée,
    // peut laisser une install partielle sans raccourcis créés.
    perMachine: false,
    createDesktopShortcut: true,
    runAfterFinish: true,
  },
  publish: {
    provider: 'github',
    owner: 'Xexelevrai',
    repo: 'Lunaria-App',
    // 'release' au lieu du défaut 'draft' : publie directement la release au lieu de la
    // laisser en brouillon (qui demandait auparavant un clic manuel, ou un appel API à
    // la main). S'applique aussi bien à un `npm run release` local qu'à GitHub Actions.
    releaseType: 'release',
  },
};
