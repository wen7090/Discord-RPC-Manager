# Discord RPC Manager

Une application de bureau pour gérer facilement votre Rich Presence Discord.

## Fonctionnalités

- Interface utilisateur intuitive pour configurer votre Rich Presence
- Prévisualisation en direct des modifications
- Sauvegarde et chargement des configurations
- Support des boutons personnalisés
- Gestion des images (grande et petite)
- Mode sombre élégant

## Installation

### Utilisateurs
Téléchargez la dernière version depuis la [page des releases](https://github.com/wen7090/discord-rpc-manager/releases).

Disponible pour :
- Windows (.exe)
- macOS (.dmg)
- Linux (.AppImage, .deb)

### Développeurs

1. Clonez le repository
```bash
git clone https://github.com/wen7090/discord-rpc-manager.git
cd discord-rpc-manager
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez en mode développement
```bash
npm run electron:dev
```

## Build

Pour compiler l'application pour votre système :

```bash
# Windows
npm run electron:build:win

# macOS
npm run electron:build:mac

# Linux
npm run electron:build:linux
```

Les fichiers compilés seront disponibles dans le dossier `dist-electron`.

## Configuration Discord Developer

1. Rendez-vous sur le [Portail Développeurs Discord](https://discord.com/developers/applications)
2. Créez une nouvelle application
3. Copiez le "Client ID"
4. Dans la section "Rich Presence", ajoutez vos assets (images)
5. Utilisez ces informations dans l'application

## Licence

Ce projet est sous licence Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

- [Discord](https://discord.com/invite/YhTDM8FCrr)
- [GitHub Issues](https://github.com/wen7090/discord-rpc-manager/issues)

## Remerciements

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
