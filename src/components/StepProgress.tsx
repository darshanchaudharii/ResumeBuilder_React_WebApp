import { Check } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, name: 'Personal Info', description: 'Basic information' },
  { id: 2, name: 'Education', description: 'Academic background' },
  { id: 3, name: 'Experience', description: 'Work history' },
  { id: 4, name: 'Skills', description: 'Technical skills' },
  { id: 5, name: 'Preview', description: 'Review & export' },
];

export function StepProgress() {
  const { state } = useResume();
  const { currentStep } = state;

  return (
    <div className="w-full bg-card border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <motion.div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    step.id < currentStep
                      ? 'bg-step-completed text-white'
                      : step.id === currentStep
                      ? 'bg-step-active text-white'
                      : 'bg-muted text-step-inactive'
                  }
                `}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </motion.div>
              <div className="ml-3 hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {step.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  ml-4 w-12 sm:w-20 h-0.5 
                  ${step.id < currentStep ? 'bg-step-completed' : 'bg-muted'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}