'use client';

import React from 'react';
import { Check, User, HelpCircle, MessageSquareQuote, Award } from 'lucide-react';

export default function StepIndicator({ currentStep, steps }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        
        {/* Progress connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-polri-gold via-yellow-400 to-polri-blue transition-all duration-500 -translate-y-1/2 z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isDone
                    ? 'bg-polri-gold text-polri-dark shadow-glow-gold scale-100'
                    : isCurrent
                    ? 'bg-polri-blue text-white ring-4 ring-polri-gold/40 shadow-glow scale-110'
                    : 'bg-polri-card text-slate-400 border border-slate-700'
                }`}
              >
                {isDone ? <Check className="w-6 h-6 stroke-[3]" /> : step.id}
              </div>
              <span 
                className={`mt-2.5 text-xs font-semibold tracking-wide transition-colors text-center ${
                  isCurrent ? 'text-polri-gold' : isDone ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
