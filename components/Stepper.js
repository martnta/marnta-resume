import React from 'react';
import { motion } from 'framer-motion';

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 rounded-lg relative">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center flex-1">
            <div className="relative">
              <motion.div
                className={`rounded-full w-12 h-12 flex items-center justify-center ${
                  index <= activeStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: index === activeStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {index < activeStep && (
                  <motion.svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
                {index >= activeStep && (
                  <span className="text-white font-bold">{index + 1}</span>
                )}
              </motion.div>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 left-full w-full h-1 -translate-y-1/2">
                  <motion.div
                    className={`h-full ${
                      index < activeStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index < activeStep ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}
            </div>
            <motion.div
              className={`mt-2 text-sm font-medium text-center ${
                index <= activeStep ? 'text-blue-600' : 'text-gray-500'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {step}
            </motion.div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;