import { useTranslation } from 'react-i18next';
import { RPCConfig } from '../types';

interface PreviewProps {
  config: RPCConfig;
}

export function Preview({ config }: PreviewProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-[#36393f] text-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{t('preview.title')}</h3>
      
      <div className="flex items-start space-x-4 bg-[#2f3136] p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          {config.largeImageKey && (
            <div className="relative">
              <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                <span className="text-xs text-gray-400">{config.largeImageText}</span>
              </div>
              {config.smallImageKey && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border-2 border-[#2f3136]">
                  <span className="text-xs text-gray-400">{config.smallImageText}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex-1">
            <div className="space-y-1">  
            {config.details && (
            <p className="text-sm font-medium">{config.details}</p>
          )}
          {config.state && (
            <p className="text-sm text-gray-400">{config.state}</p>
          )}
            </div>
            
            {config.buttons && config.buttons.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {config.buttons.map((button, index) => (
                  button.label && (
                    <button
                      key={index}
                      className="px-4 py-1.5 bg-[#4f545c] hover:bg-[#686d73] rounded text-sm font-medium transition-colors"
                    >
                      {button.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}