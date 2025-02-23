import { useState } from "react";
import { Save, Play, Square } from "lucide-react";
import { RPCConfig } from "../types";
import { useTranslation } from "react-i18next";


interface ConfigFormProps {
  config: RPCConfig;
  onChange: (config: RPCConfig) => void;
  onSave: () => void;
  onStart: () => void;
  onStop: () => void;
  isActive: boolean;
}

export function ConfigForm({
  config,
  onChange,
  onSave,
  onStart,
  onStop,
  isActive,
}: ConfigFormProps) {
  const [showButtons, setShowButtons] = useState(false);
  const { t } = useTranslation();

  const handleChange = (field: keyof RPCConfig, value: string | Array<{ label: string; url: string }>) => {
    onChange({ ...config, [field]: value });
  };
  
  const handleButtonChange = (
    index: number,
    field: "label" | "url",
    value: string
  ) => {
    const newButtons = [...(config.buttons || [])];
    if (!newButtons[index]) {
      newButtons[index] = { label: "", url: "" };
    }
    newButtons[index][field] = value;
    handleChange("buttons", newButtons);
  };

  return (
    <div className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
        {t("configForm.clientID.clientID")}
          <input
            type="text"
            value={config.clientId || ""}
            onChange={(e) => handleChange("clientId", e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder={t("configForm.clientID.discordAppID")}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
          {t("configForm.state.state")}
            <input
              type="text"
              value={config.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t("configForm.state.playing")}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
          {t("configForm.details.details")}
            <input
              type="text"
              value={config.details || ""}
              onChange={(e) => handleChange("details", e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t("configForm.details.multiplayerMode")}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
          {t("configForm.largeImage.largeImage")}
            <input
              type=" text"
              value={config.largeImageKey || ""}
              onChange={(e) => handleChange("largeImageKey", e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t("configForm.largeImage.logo")}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
          {t("configForm.largeImageText.largeImageText")}
            <input
              type="text"
              value={config.largeImageText || ""}
              onChange={(e) => handleChange("largeImageText", e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t("configForm.largeImageText.myFavoriteGame")}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
          {t("configForm.smallImage.smallImage")}
            <input
              type=" text"
              value={config.smallImageKey || ""}
              onChange={(e) => handleChange("smallImageKey", e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t("configForm.smallImage.status")}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
          {t("configForm.smallImageText.smallImageText")}
            <input
              type="text"
              value={config.smallImageText || ""}
              onChange={(e) => handleChange("smallImageText", e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder={t("configForm.smallImageText.text")}
            />
          </label>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowButtons(!showButtons)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {showButtons ? t('configForm.hideButtons') : t('configForm.addButtons') }
        </button>

        {showButtons && (
          <div className="mt-4 space-y-4">
            {[0, 1].map((index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                  {t("configForm.buttons")} {index + 1} - Text
                    <input
                      type="text"
                      value={config.buttons?.[index]?.label || ""}
                      onChange={(e) =>
                        handleButtonChange(index, "label", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=" Join"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                  {t("configForm.buttons")} {index + 1} - URL
                    <input
                      type="url"
                      value={config.buttons?.[index]?.url || ""}
                      onChange={(e) =>
                        handleButtonChange(index, "url", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder=" https://..."
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onSave}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          {t("configForm.save")}
        </button>
        {!isActive ? (
          <button
            onClick={onStart}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Play className="h-4 w-4 mr-2" />
            {t("configForm.start")}
          </button>
        ) : (
          <button
            onClick={onStop}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Square className="h-4 w-4 mr-2" />
            {t("configForm.stop")}
          </button>
        )}
      </div>
    </div>
  );
}
