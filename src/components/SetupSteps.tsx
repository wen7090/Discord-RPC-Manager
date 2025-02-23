import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';

export function SetupSteps() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
  };

  return (
    <div className="bg-gray-800 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg relative">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="text-lg font-medium text-white mb-2">
            {t(`setup.steps.${currentStep}.title`)}
          </h3>
          <p
            className="text-sm text-gray-300"
            dangerouslySetInnerHTML={{
              __html: t(`setup.steps.${currentStep}.description`),
            }}
          />
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className={`p-1 rounded-full ${
            currentStep === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNextStep}
          disabled={currentStep === totalSteps}
          className={`p-1 rounded-full ${
            currentStep === totalSteps
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
