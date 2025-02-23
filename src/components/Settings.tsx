import { useState, useEffect } from 'react';
import { Download, RefreshCw, Heart, Github } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

interface GithubRelease {
  tag_name: string;
  html_url: string;
}

interface SettingsProps {
  currentVersion: string;
}

export function Settings({ currentVersion }: SettingsProps) {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [releaseUrl, setReleaseUrl] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const GITHUB_REPO = 'wen7090/Discord-RPC-Manager';

  const checkForUpdates = async () => {
    setIsChecking(true);
    setLatestVersion(null);
    setError(null);

    try {
      const [response] = await Promise.all([
        fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GithubRelease = await response.json();
      
      const version = data.tag_name.replace(/^v/, '');
      setLatestVersion(version);
      setReleaseUrl(data.html_url);
    } catch (err) {
      console.error('Error checking for updates:', err);
      setError('Unable to check for updates. Please try again later.');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  const hasUpdate = latestVersion && 
    latestVersion.localeCompare(currentVersion, undefined, { numeric: true, sensitivity: 'base' }) > 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">{t("settings.settings")}</h2>

      <div className="space-y-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">{t("settings.updates")}</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">{t("settings.currentVersion")} <span className="text-white">{currentVersion}</span></p>
              {isChecking ? (
                <p className="text-gray-300">
                  {t("settings.verification")}
                </p>
              ) : latestVersion ? (
                <p className="text-gray-300">
                  {t("settings.latestVersion")} <span className="text-white">{latestVersion}</span>
                </p>
              ) : error ? (
                <p className="text-red-400 text-sm">{error}</p>
              ) : null}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={checkForUpdates}
                disabled={isChecking}
                className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                {t("settings.check")}
              </button>
              {hasUpdate && releaseUrl && (
                <a
                  href={releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("settings.download")}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">{t("settings.links")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://discord.com/invite/YhTDM8FCrr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-[#5865F2] rounded-lg text-white hover:bg-[#4752C4] transition-colors"
            >
              <FaDiscord className="h-5 w-5 mr-2" />
              Discord
            </a>
            <a
              href="https://github.com/wen7090/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=M5EMBRXC8EPEQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-[#003087] rounded-lg text-white hover:bg-[#001F6C] transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              {t("settings.makeADonation")}
            </a>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">{t("settings.about.title")}</h3>
          <p className="text-gray-300">
            {t("settings.about.text1")}
          </p>
          <p className="text-gray-300 mt-2">
            {t("settings.about.text2")}
          </p>
          
          <div className="mt-4">
            <a
              href="https://github.com/wen7090/Discord-RPC-Manager/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t("settings.about.viewLicense")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
