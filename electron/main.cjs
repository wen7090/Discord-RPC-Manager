const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const Store = require("electron-store");
const DiscordRPC = require("discord-rpc");

const store = new Store();
let rpc = null;
let currentConfig = null;

function initializeRPC(clientId) {
  return new Promise((resolve, reject) => {
    try {
      DiscordRPC.register(clientId);

      rpc = new DiscordRPC.Client({ transport: "ipc" });

      rpc.on("ready", () => {
        console.log("Discord RPC connecté!");
        resolve();
      });

      rpc.on("error", (error) => {
        console.error("Erreur Discord RPC:", error);
        reject(error);
      });

      rpc.on("disconnected", () => {
        console.log("Discord RPC déconnecté");
        rpc = null;
      });

      rpc.login({ clientId }).catch(reject);
    } catch (error) {
      console.error("Erreur lors de l'initialisation du RPC:", error);
      reject(error);
    }
  });
}

async function updatePresence(config) {
  if (!rpc) {
    console.error("Client RPC non initialisé");
    return false;
  }

  try {
    const timestamp = Date.now();
    const activity = {
      details: config.details || undefined,
      state: config.state || undefined,
      largeImageKey: config.largeImageKey || undefined,
      largeImageText: config.largeImageText || undefined,
      smallImageKey: config.smallImageKey || undefined,
      smallImageText: config.smallImageText || undefined,
      startTimestamp: timestamp,
      instance: false,
    };

    if (config.buttons && config.buttons.length > 0) {
      const validButtons = config.buttons.filter((btn) => btn.label && btn.url);
      if (validButtons.length > 0) {
        activity.buttons = validButtons;
      }
    }

    console.log("Mise à jour de la présence avec:", activity);
    await rpc.setActivity(activity);
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la présence:", error);
    return false;
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1050,
    height: 1050,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: true,
    icon: path.join(__dirname, "../build/icon.ico"),
    backgroundColor: "#111827",
  });

  win.removeMenu();

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.on("closed", () => {
    if (rpc) {
      rpc.destroy();
      rpc = null;
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (rpc) {
    rpc.destroy();
    rpc = null;
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("get-saved-configs", () => {
  return store.get("savedConfigs", []);
});

ipcMain.handle("save-configs", (event, configs) => {
  store.set("savedConfigs", configs);
  return true;
});

ipcMain.handle("start-rpc", async (event, config) => {
  try {
    if (rpc) {
      await rpc.destroy();
      rpc = null;
    }

    console.log("Démarrage du RPC avec le client ID:", config.clientId);
    await initializeRPC(config.clientId);
    console.log("RPC initialisé, mise à jour de la présence...");
    const success = await updatePresence(config);

    if (success) {
      currentConfig = config;
      console.log("Présence mise à jour avec succès");
      return true;
    } else {
      console.error("Échec de la mise à jour de la présence");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors du démarrage du RPC:", error);
    return false;
  }
});

ipcMain.handle("stop-rpc", async () => {
  if (rpc) {
    try {
      await rpc.destroy();
      console.log("RPC arrêté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'arrêt du RPC:", error);
    }
    rpc = null;
    currentConfig = null;
  }
  return true;
});

ipcMain.handle("update-presence", async (event, config) => {
  return await updatePresence(config);
});
