import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ConfigForm } from "./components/ConfigForm";
import { Preview } from "./components/Preview";
import { Settings } from "./components/Settings";
import { RPCConfig, SavedConfig } from "./types";
import { Github, Heart } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { UpdatePopup } from "./components/UpdatePopup";
import { LanguageSelector } from "./components/LanguageSelector";
import { SetupSteps } from "./components/SetupSteps";
import { useTranslation } from "react-i18next";

const { ipcRenderer } = window.require("electron");

const defaultConfig: RPCConfig = {
  clientId: "",
  state: "",
  details: "",
  largeImageKey: "",
  largeImageText: "",
  smallImageKey: "",
  smallImageText: "",
  buttons: [],
};

const CURRENT_VERSION = "1.0.0";

function App() {
  const [config, setConfig] = useState<RPCConfig>(defaultConfig);
  const [isActive, setIsActive] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
  const [activeTab, setActiveTab] = useState<"config" | "settings">("config");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadSavedConfigs();
  }, []);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/wen7090/Discord-RPC-Manager/releases/latest"
        );
        if (!response.ok) throw new Error("Failed to check for updates");

        const data = await response.json();
        const version = data.tag_name.replace(/^v/, "");

        if (
          version.localeCompare(CURRENT_VERSION, undefined, {
            numeric: true,
            sensitivity: "base",
          }) > 0
        ) {
          setLatestVersion(version);
          setShowUpdatePopup(true);
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const loadSavedConfigs = async () => {
    const configs = await ipcRenderer.invoke("get-saved-configs");
    setSavedConfigs(configs || []);
  };

  const handleUpdate = () => {
    window.open(
      "https://github.com/wen7090/Discord-RPC-Manager/releases/latest",
      "_blank"
    );
    setShowUpdatePopup(false);
  };

  const handleLater = () => {
    setShowUpdatePopup(false);
  };

  const handleSave = async () => {
    const name = prompt("Configuration Name:");
    if (name) {
      const newConfig: SavedConfig = {
        ...config,
        name,
        autoStart: false,
      };
      const newConfigs = [...savedConfigs, newConfig];
      await ipcRenderer.invoke("save-configs", newConfigs);
      setSavedConfigs(newConfigs);
      toast.success("Configuration saved");
    }
  };

  const handleStart = async () => {
    if (!config.clientId) {
      toast.error("Client ID required");
      return;
    }

    try {
      const success = await ipcRenderer.invoke("start-rpc", config);
      if (success) {
        setIsActive(true);
        toast.success("Rich Presence enabled");
      } else {
        toast.error("Error activating Rich Presence");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Error activating Rich Presence");
    }
  };

  const handleStop = async () => {
    try {
      await ipcRenderer.invoke("stop-rpc");
      setIsActive(false);
      toast.success("Rich Presence disabled");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Error disabling Rich Presence");
    }
  };

  const handleConfigChange = async (newConfig: RPCConfig) => {
    setConfig(newConfig);
    if (isActive) {
      try {
        await ipcRenderer.invoke("update-presence", newConfig);
      } catch (error) {
        console.error("Error updating presence:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {t("app.title")}
              </h1>
              <p className="text-gray-400">{t("app.subtitle")}</p>
            </div>
            <div className="flex items-center space-x-6">
              <LanguageSelector />
              <a
                href="https://discord.gg/YhTDM8FCrr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#5865F2] transition-colors"
                title="Rejoindre le Discord"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/wen7090/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Voir sur GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=M5EMBRXC8EPEQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF424D] transition-colors"
                title="Faire un don"
              >
                <Heart className="h-6 w-6" />
              </a>
            </div>
          </div>

          <SetupSteps />

          <div className="mb-6">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab("config")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "config"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Configuration
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "settings"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t("settings.settings")}
              </button>
            </nav>
          </div>

          {activeTab === "config" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Configuration
                </h2>
                <ConfigForm
                  config={config}
                  onChange={handleConfigChange}
                  onSave={handleSave}
                  onStart={handleStart}
                  onStop={handleStop}
                  isActive={isActive}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Preview
                </h2>
                <Preview config={config} />

                {savedConfigs.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Saved Configurations
                    </h3>
                    <div className="space-y-4">
                      {savedConfigs.map((saved, index) => (
                        <div
                          key={index}
                          className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => handleConfigChange(saved)}
                        >
                          <h4 className="font-medium text-white">
                            {saved.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {saved.details || "Pas de détails"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Settings currentVersion={CURRENT_VERSION} />
          )}
        </div>
      </div>

      {showUpdatePopup && latestVersion && (
        <UpdatePopup
          version={latestVersion}
          onUpdate={handleUpdate}
          onLater={handleLater}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#374151",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
