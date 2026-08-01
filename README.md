# Lunaria Launcher

Launcher desktop (Windows) pour le serveur FiveM Lunaria : connexion en un clic, statut serveur en direct, actualités, vidéo d'introduction au premier lancement.

## Installation (dev)

```bash
npm install
npm start
```

`npm start` compile le process principal (TypeScript → `dist/`) puis lance Electron.

## Build de l'installeur Windows

```bash
npm run dist
```

Génère un installeur `.exe` (NSIS) dans `release/`.

## À fournir avant mise en production

- `assets/video/intro.mp4` — vidéo d'introduction (voir `assets/video/LISEZ-MOI.txt`)
- `assets/images/logo.png` — logo Lunaria (voir `assets/images/LISEZ-MOI.txt`)
- `build/icon.ico` — icône de l'application, puis décommenter la ligne `icon:` dans `electron-builder.yml`
- `config/server.json` — renseigner `newsUrl` quand un backend d'actualités sera disponible
- `electron-builder.yml` → section `publish` : remplacer par la vraie URL/provider de mise à jour (generic ou GitHub) avant la première release, sinon `electron-updater` ne trouvera rien à vérifier (géré silencieusement, sans crash)

## Configuration serveur

Éditable sans recompiler dans `config/server.json` :

```json
{
  "cfxCode": "e6eb3xd",
  "connectFallback": "162.19.126.62:30121",
  "statusBaseUrl": "http://162.19.126.62:30121",
  "newsUrl": ""
}
```

- `cfxCode` : code utilisé pour `fivem://connect/<cfxCode>` au clic sur JOUER.
- `statusBaseUrl` : base des endpoints natifs FiveM (`/info.json`, `/players.json`) interrogés toutes les 30s pour le statut en direct.
- `newsUrl` : URL retournant un tableau JSON `[{ "title": "...", "date": "...", "content": "..." }]`. Laisser vide tant qu'aucun backend n'est disponible — le launcher affiche alors "Aucune actualité pour le moment".

## Structure

- `src/main/` — process principal Electron (TypeScript)
- `src/renderer/` — interface (HTML/CSS/JS vanilla)
- `config/server.json` — configuration éditable
- `assets/` — vidéo d'intro + images fournies par l'admin
