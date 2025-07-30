// src/components/ResumeBuilder.tsx

import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { StepProgress } from './StepProgress';
import { ResumePreview } from './Preview/ResumePreview';
import { MobileTabSwitcher } from './MobileTabSwitcher';
import { Step1Personal } from './StepForm/Step1Personal';
import { Step2Education } from './StepForm/Step2Education';
import { Step3Experience } from './StepForm/Step3Experience';
import { Step4Skills } from './StepForm/Step4Skills';
import { Step5Summary } from './StepForm/Step5Summary';
import { motion, AnimatePresence } from 'framer-motion';

export function ResumeBuilder() {
  const { state } = useResume();
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1Personal />;
      case 2:
        return <Step2Education />;
      case 3:
        return <Step3Experience />;
      case 4:
        return <Step4Skills />;
      case 5:
        return <Step5Summary />;
      default:
        return <Step1Personal />;
    }
  };

  return (
    <div className="bg-gradient-secondary py-6">
      <div className="container mx-auto px-4">
        {/* Step Progress */}
        <StepProgress />

        {/* Mobile Tab Switcher */}
        <MobileTabSwitcher
          activeTab={mobileTab}
          onTabChange={setMobileTab}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form Section */}
          <div
            className={`lg:col-span-3 ${
              mobileTab === 'form' ? 'block' : 'hidden'
            } lg:block`}
          >
            <div className="overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderCurrentStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`lg:col-span-2 ${
              mobileTab === 'preview' ? 'block' : 'hidden'
            } lg:block`}
          >
            <div className="bg-card rounded-lg shadow-medium overflow-hidden">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
