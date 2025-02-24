# Discord RPC Manager

[![Join our Discord](https://img.shields.io/discord/1258049354804232293.svg?logo=discord&logoColor=white&color=7289DA&label=Join%20our%20Discord&labelColor=7289DA)](https://discord.gg/YhTDM8FCrr)  
[![GitHub stars](https://img.shields.io/github/stars/wen7090/Discord-rpc-manager?label=GitHub%20Stars&logo=github)](https://github.com/wen7090/Discord-rpc-manager/stargazers)  
[![Downloads](https://img.shields.io/github/downloads/wen7090/Discord-rpc-manager/total.svg?logo=github&logoColor=white&label=Downloads&color=blue)](https://github.com/wen7090/Discord-rpc-manager/releases/latest)  
[![Version](https://img.shields.io/github/v/release/wen7090/Discord-rpc-manager?label=Current%20Version&color=orange)](https://github.com/wen7090/Discord-rpc-manager/releases/latest)  
![Code Size](https://img.shields.io/badge/Code%20Size-198%20MB-brightgreen)  
[![Wiki](https://img.shields.io/badge/Wiki-Documentation-blue.svg)](https://github.com/wen7090/Discord-rpc-manager/wiki)  
[![Donate via PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat&logo=paypal&color=00457C&labelColor=003087)](https://www.paypal.com/donate/?hosted_button_id=M5EMBRXC8EPEQ)

Available Languages: [Français](README.fr.md)

_(English content continues here)_

A desktop application to easily manage your Discord Rich Presence.

## Features

- Intuitive user interface to configure your Rich Presence
- Live preview of changes
- Save and load configurations
- Support for custom buttons
- Image management (large and small)
- Sleek dark mode

## Installation

### Users
Download the latest release from the [releases page](https://github.com/wen7090/discord-rpc-manager/releases).

Available for:
- Windows (.exe)
- macOS (.dmg)
- Linux (.AppImage, .deb)

### Developers

1. Clone the repository
```bash
git clone https://github.com/wen7090/discord-rpc-manager.git
cd discord-rpc-manager
```

2. Install dependencies
```bash
npm install
```

3. Launch in development mode
```bash
npm run electron:dev
```

## Build

To build the application for your system:

```bash
# Windows
npm run electron:build:win

# macOS
npm run electron:build:mac

# Linux
npm run electron:build:linux
```

The compiled files will be available in the `dist-electron` folder.

## Discord Developer Configuration

    Go to the [Discord Developer Portal](https://discord.com/developers/applications)
    Create a new application
    Copy the "Client ID"
    In the "Rich Presence" section, add your assets (images)
    Use this information in the application

## Licence

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). See the [LICENSE](LICENSE) file for more details.

## Support

- [Discord](https://discord.com/invite/YhTDM8FCrr)
- [GitHub Issues](https://github.com/votre-compte/discord-rpc-manager/issues)

## Acknowledgements

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
