import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GB, FR } from 'country-flag-icons/react/3x2';

const languages = [
  { code: 'en', name: 'English', Icon: GB },
  { code: 'fr', name: 'Français', Icon: FR }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
      >
        {currentLanguage && <currentLanguage.Icon className="w-5 h-5" />}
        {currentLanguage?.name}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-10">
          {languages.map(({ code, name, Icon }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-left text-white hover:bg-gray-700 ${
                i18n.language === code ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={i18n.language === code}
            >
              <Icon className="w-5 h-5" />
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
