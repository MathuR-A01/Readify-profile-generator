'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { PROFILE_TYPE_META } from '@/lib/data';
import { ProfileType } from '@/types';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const TYPES: ProfileType[] = ['student', 'professional', 'expert'];

export default function StepProfileType() {
  const { profileType, setProfileType, setCurrentStep, resetStore } = useProfileStore();

  const pick = (t: ProfileType) => {
    resetStore();
    setProfileType(t);
    setTimeout(() => setCurrentStep(1), 250);
  };

  return (
    <div className="step-panel">
      <h2 className="section-title">🎯 Choose Your Profile Type</h2>
      <p style={{ color: 'var(--text-3)', fontSize: '13px', marginBottom: 24 }}>
        Each type has different form fields and a tailored README template.
      </p>

      <div className="flex flex-col gap-4">
        {TYPES.map((t) => {
          const m = PROFILE_TYPE_META[t];
          const active = profileType === t;

          return (
            <button
              key={t}
              id={`type-card-${t}`}
              onClick={() => pick(t)}
              className="type-card relative"
              style={{
                borderColor: active ? m.accent : 'rgba(99,102,241,0.18)',
                boxShadow: active ? `0 0 30px ${m.glow}` : 'none',
                transform: active ? 'translateY(-2px)' : 'none',
              }}>
              {active && (
                <CheckCircle2 size={17} className="absolute top-3.5 right-3.5"
                  style={{ color: m.accent }} />
              )}

              <div className="flex items-start gap-4">
                <span className="text-3xl animate-float" style={{ animationDelay: `${TYPES.indexOf(t) * 0.4}s` }}>
                  {m.icon}
                </span>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-white text-[15px]">{m.label}</span>
                    {active && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: `${m.accent}20`, color: m.accent, border: `1px solid ${m.accent}40` }}>
                        Selected
                      </span>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-3)', fontSize: '12.5px', marginBottom: 10 }}>{m.tagline}</p>

                  {/* Steps preview badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {m.steps.slice(1).map(step => (
                      <span key={step} className="text-[10.5px] px-2 py-0.5 rounded-md"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-3)' }}>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="mt-4 h-px rounded-full"
                   style={{ background: `linear-gradient(90deg,transparent,${m.accent}60,transparent)`, opacity: active ? 1 : 0.35 }} />

              <div className="flex items-center gap-1 mt-2 text-xs font-medium" style={{ color: m.accent }}>
                {active ? 'Selected ✓' : 'Select this template'} <ChevronRight size={12} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
