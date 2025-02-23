import { X } from 'lucide-react';
import { useTranslation } from "react-i18next";

interface UpdatePopupProps {
  version: string;
  onUpdate: () => void;
  onLater: () => void;
}

export function UpdatePopup({ version, onUpdate, onLater }: UpdatePopupProps) {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg shadow-lg p-6 w-96 border border-gray-700 animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{t("updatePopup.updateAvailable")}</h3>
        <button
          onClick={onLater}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <p className="text-gray-300 mb-4">
      {t("updatePopup.message", ({ version }))}
      </p>
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={onLater}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          {t("updatePopup.later")}
        </button>
        <button
          onClick={onUpdate}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t("updatePopup.updateNow")}
        </button>
      </div>
    </div>
  );
}