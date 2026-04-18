'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { README_THEMES } from '@/lib/data';
import { Palette, Check } from 'lucide-react';

export default function StepTheme() {
  const { readmeTheme, setReadmeTheme, personal } = useProfileStore();
  const u = personal.githubUsername || 'anuraghazra';

  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title"><Palette size={19} style={{ color: 'var(--violet)' }} /> README Theme</h2>
      <p className="text-xs" style={{ color: 'var(--text-3)', marginTop: -10 }}>
        Sets the colour theme for your GitHub stats cards.
      </p>

      {/* Theme grid */}
      <div className="grid grid-cols-2 gap-3">
        {README_THEMES.map(t => {
          const active = readmeTheme === t.id;
          return (
            <button key={t.id} id={`theme-${t.id}`}
              onClick={() => setReadmeTheme(t.id)}
              className={`theme-card text-left relative ${active ? 'on' : ''}`}
              style={{ background: t.bg }}>
              {active && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--violet)' }}>
                  <Check size={10} className="text-white" />
                </div>
              )}
              {/* Swatches */}
              <div className="flex gap-1 mb-2">
                <div className="w-5 h-3 rounded-sm" style={{ background: t.accent }} />
                <div className="flex-1 h-3 rounded-sm" style={{ background: `${t.accent}30` }} />
              </div>
              <p className="text-[12px] font-semibold" style={{ color: t.accent }}>{t.name}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>{t.id}</p>
            </button>
          );
        })}
      </div>

      {/* Live preview */}
      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs mb-3" style={{ color: 'var(--text-3)' }}>Live preview of selected theme:</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={readmeTheme}
          src={`https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${readmeTheme}&hide_border=true&count_private=true`}
          alt="theme preview"
          className="w-full rounded-lg"
          style={{ maxHeight: 120, objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
