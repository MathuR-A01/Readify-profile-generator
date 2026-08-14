'use client';
import React, { useState } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { README_THEMES, cleanUsername } from '@/lib/data';
import { Palette, Check, AlertTriangle, RefreshCw } from 'lucide-react';

export default function StepTheme() {
  const { readmeTheme, setReadmeTheme, personal } = useProfileStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const u = cleanUsername(personal.githubUsername);
  
  const statsPreviewUrl = useFallback
    ? `https://github-readme-stats-eight-theta.vercel.app/api?username=${encodeURIComponent(u)}&show_icons=true&theme=${readmeTheme}&hide_border=true&count_private=true&k=${retryKey}`
    : `/api/stats?username=${encodeURIComponent(u)}&theme=${readmeTheme}&hide_border=true&k=${retryKey}`;

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
              onClick={() => {
                setReadmeTheme(t.id);
                setImgLoaded(false);
                setImgError(false);
              }}
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
      <div className="p-4 rounded-xl flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>Live preview of selected theme:</p>
          {imgError && (
            <button
              onClick={() => { setImgError(false); setImgLoaded(false); setRetryKey(k => k + 1); setUseFallback(true); }}
              className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded cursor-pointer"
              style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.3)' }}>
              <RefreshCw size={10} /> Retry with Mirror
            </button>
          )}
        </div>

        <div className="relative min-h-[100px] flex items-center justify-center overflow-hidden">
          {!imgLoaded && !imgError && (
            <div className="flex items-center gap-2 py-6 text-xs" style={{ color: 'var(--text-3)' }}>
              <div className="w-4 h-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <span>Loading theme preview...</span>
            </div>
          )}

          {imgError ? (
            <div className="flex flex-col items-center gap-1.5 py-3 text-center">
              <AlertTriangle size={18} className="text-amber-400" />
              <p className="text-xs text-slate-300 font-medium">Unable to load preview card</p>
              <p className="text-[11px] text-slate-400">Please check your GitHub username in Personal Info.</p>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={`${readmeTheme}-${u}-${retryKey}-${useFallback}`}
              src={statsPreviewUrl}
              alt="theme preview"
              className="w-full rounded-lg transition-opacity duration-300"
              style={{
                maxHeight: 130,
                objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                visibility: imgLoaded ? 'visible' : 'hidden',
                position: imgLoaded ? 'static' : 'absolute',
                top: 0,
                left: 0,
              }}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                if (!useFallback) {
                  setUseFallback(true);
                } else {
                  setImgError(true);
                }
                setImgLoaded(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
