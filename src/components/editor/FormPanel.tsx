'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { PROFILE_TYPE_META } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy-load each step to keep bundle lean
const STEP_MAP: Record<string, React.ComponentType> = {
  'Profile Type':  dynamic(() => import('@/components/steps/StepProfileType')),
  'Personal Info': dynamic(() => import('@/components/steps/StepPersonalInfo')),
  'About Me':      dynamic(() => import('@/components/steps/StepAboutMe')),
  'Skills':        dynamic(() => import('@/components/steps/StepTechSkills')),
  'GitHub Stats':  dynamic(() => import('@/components/steps/StepGitHubStats')),
  'Projects':      dynamic(() => import('@/components/steps/StepProjects')),
  'WakaTime':      dynamic(() => import('@/components/steps/StepWakaTime')),
  'Social Links':  dynamic(() => import('@/components/steps/StepSocialLinks')),
  'Extras':        dynamic(() => import('@/components/steps/StepExtras')),
  'Theme':         dynamic(() => import('@/components/steps/StepTheme')),
};

export default function FormPanel() {
  const { profileType, currentStep, setCurrentStep } = useProfileStore();
  const steps = PROFILE_TYPE_META[profileType].steps;
  const stepName = steps[currentStep];
  const StepComp = STEP_MAP[stepName];
  const isFirst = currentStep === 0;
  const isLast  = currentStep === steps.length - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Scrollable form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px 20px' }}>
        {StepComp ? <StepComp /> : null}
      </div>

      {/* Nav bar */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        background: 'rgba(6,8,16,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: 12,
      }}>
        <button id="prevStepBtn" className="btn btn-outline btn-sm"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={isFirst}
          style={{ opacity: isFirst ? 0.35 : 1 }}>
          <ChevronLeft size={15} /> Back
        </button>

        <span className="text-xs" style={{ color: 'var(--text-3)' }}>
          {currentStep + 1} / {steps.length}
        </span>

        {isLast ? (
          <button id="doneBtn" className="btn btn-primary btn-sm">
            ✨ Done!
          </button>
        ) : (
          <button id="nextStepBtn" className="btn btn-primary btn-sm"
            onClick={() => setCurrentStep(currentStep + 1)}>
            Next <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
