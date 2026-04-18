'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { PROFILE_TYPE_META } from '@/lib/data';
import { Check } from 'lucide-react';

export default function StepProgress() {
  const { profileType, currentStep, setCurrentStep } = useProfileStore();
  const steps = PROFILE_TYPE_META[profileType].steps;

  return (
    <div style={{ padding: '10px 20px', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
      {/* Mobile: progress bar */}
      <div className="flex items-center gap-2 mb-1 md:hidden">
        <span className="text-xs" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
          {currentStep + 1} / {steps.length}
        </span>
        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div className="h-full rounded-full transition-all duration-500"
               style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }} />
        </div>
        <span className="text-xs font-semibold" style={{ color: 'var(--violet)', whiteSpace: 'nowrap' }}>
          {steps[currentStep]}
        </span>
      </div>

      {/* Desktop: dot trail */}
      <div className="hidden md:flex items-center overflow-x-auto pb-1 gap-0">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center" style={{ flex: i < steps.length - 1 ? '1 1 0' : 'none' }}>
            <button
              id={`step-${i}`}
              title={step}
              onClick={() => setCurrentStep(i)}
              className={`step-dot ${i < currentStep ? 'done' : i === currentStep ? 'active' : 'todo'}`}>
              {i < currentStep ? <Check size={11} /> : i + 1}
            </button>
            {i < steps.length - 1 && (
              <div className={`step-line ${i < currentStep ? 'done' : 'todo'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="hidden md:block mt-1.5">
        <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>
          Step {currentStep + 1} of {steps.length} — <span style={{ color: 'var(--text-2)' }}>{steps[currentStep]}</span>
        </span>
      </div>
    </div>
  );
}
