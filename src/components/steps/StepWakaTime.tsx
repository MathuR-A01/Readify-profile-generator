'use client';
import React, { useState } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { Clock, Info, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

const RANGES  = ['last_7_days','last_30_days','last_6_months','last_year','all_time'];
const THEMES  = ['tokyonight','radical','merko','gruvbox','cobalt','dracula'];
const LAYOUTS = ['default','compact'];

const RANGE_LABELS: Record<string,string> = {
  last_7_days:   'Last 7 Days',
  last_30_days:  'Last 30 Days',
  last_6_months: 'Last 6 Months',
  last_year:     'Last Year',
  all_time:      'All Time',
};

function Toggle({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span className="text-[13px]" style={{ color: 'var(--text-2)' }}>{label}</span>
      <label className="toggle"><input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} /><span className="toggle-track" /></label>
    </div>
  );
}

export default function StepWakaTime() {
  const { wakatime, setWakaTime } = useProfileStore();
  const [previewKey, setPreviewKey] = useState(0);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [imgError, setImgError]     = useState(false);

  const username = wakatime.username.trim();

  const wakaCardUrl = username
    ? `/api/wakatime?username=${encodeURIComponent(username)}&theme=${wakatime.cardTheme}&layout=${wakatime.layoutStyle}&hide_border=true&range=${wakatime.statsRange}&cache_seconds=${Date.now()}`
    : '';

  const refreshPreview = () => {
    setImgLoaded(false);
    setImgError(false);
    setPreviewKey(k => k + 1);
  };

  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title">
        <Clock size={19} style={{ color: '#ec4899' }} /> WakaTime Integration
        <span className="text-[10px] px-2 py-0.5 rounded-full ml-1 font-semibold"
              style={{ background: 'rgba(236,72,153,0.1)', color: '#fb7185', border: '1px solid rgba(236,72,153,0.3)' }}>
          ⭐ Star Feature
        </span>
      </h2>

      {/* What is WakaTime */}
      <div className="info-box" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
        <Info size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color: '#fcd34d' }}>What is WakaTime?</p>
          <p className="text-xs" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
            WakaTime tracks your coding time across IDEs. Get a free account at{' '}
            <a href="https://wakatime.com" target="_blank" rel="noreferrer" style={{ color: '#f59e0b' }}>wakatime.com</a>{' '}
            and embed live coding stats in your README.
          </p>
        </div>
      </div>

      {/* Privacy requirement */}
      <div className="info-box" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)' }}>
        <AlertTriangle size={15} style={{ color: '#f87171', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color: '#fca5a5' }}>⚠️ Public Profile Required</p>
          <p className="text-xs" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
            Your WakaTime profile <strong style={{ color: '#fff' }}>must be set to Public</strong> for the stats card to work.{' '}
            <a href="https://wakatime.com/settings/account" target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-0.5" style={{ color: '#f87171' }}>
              Open Settings <ExternalLink size={10} />
            </a>{' '}→ Edit Profile → set <strong style={{ color: '#fff' }}>Languages Used Publicly</strong> and{' '}
            <strong style={{ color: '#fff' }}>Editors Used Publicly</strong> to <em>Public</em>.
          </p>
        </div>
      </div>

      {/* Username */}
      <div>
        <label className="label">WakaTime Username</label>
        <input id="wakatimeUsername" className="input" placeholder="e.g. Aayu_010"
          value={wakatime.username} onChange={e => { setWakaTime({ username: e.target.value }); setImgLoaded(false); setImgError(false); }} />
        {username && (
          <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
            Profile:{' '}
            <a href={`https://wakatime.com/@${username}`} target="_blank" rel="noreferrer" style={{ color: '#f59e0b' }}>
              wakatime.com/@{username}
            </a>
          </p>
        )}
      </div>

      {/* Stats card section */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13.5px] font-semibold text-white">📊 WakaTime Stats Card</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Embed a real-time coding stats card in your README</p>
          </div>
          <label className="toggle"><input id="wakaShowCard" type="checkbox" checked={wakatime.showCard} onChange={e => setWakaTime({ showCard: e.target.checked })} /><span className="toggle-track" /></label>
        </div>

        {wakatime.showCard && (
          <div className="flex flex-col gap-4">
            {/* Stats Range */}
            <div>
              <label className="label">Stats Range</label>
              <select id="wakaRange" className="input"
                value={wakatime.statsRange} onChange={e => { setWakaTime({ statsRange: e.target.value }); setImgLoaded(false); setImgError(false); }}>
                {RANGES.map(r => <option key={r} value={r}>{RANGE_LABELS[r]}</option>)}
              </select>
            </div>

            {/* Card Theme */}
            <div>
              <label className="label">Card Theme</label>
              <div className="flex flex-wrap gap-2">
                {THEMES.map(t => (
                  <button key={t} onClick={() => { setWakaTime({ cardTheme: t }); setImgLoaded(false); setImgError(false); }}
                    className="text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                    style={{
                      background: wakatime.cardTheme === t ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.04)',
                      border: wakatime.cardTheme === t ? '1px solid rgba(236,72,153,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      color: wakatime.cardTheme === t ? '#fb7185' : 'var(--text-3)',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div>
              <label className="label">Layout</label>
              <div className="flex gap-2">
                {LAYOUTS.map(l => (
                  <button key={l} onClick={() => { setWakaTime({ layoutStyle: l }); setImgLoaded(false); setImgError(false); }}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    style={{
                      background: wakatime.layoutStyle === l ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.04)',
                      border: wakatime.layoutStyle === l ? '1px solid rgba(236,72,153,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      color: wakatime.layoutStyle === l ? '#fb7185' : 'var(--text-3)',
                    }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            {username && (
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(236,72,153,0.15)' }}>
                <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                    Live Card Preview
                  </p>
                  <button onClick={refreshPreview} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg transition-all cursor-pointer"
                    style={{ background: 'rgba(236,72,153,0.1)', color: '#fb7185', border: '1px solid rgba(236,72,153,0.25)' }}>
                    <RefreshCw size={10} /> Refresh
                  </button>
                </div>
                <div className="p-3 flex items-center justify-center min-h-[80px]">
                  {imgError ? (
                    <div className="flex flex-col items-center gap-2 text-center py-2">
                      <AlertTriangle size={20} style={{ color: '#f87171' }} />
                      <p className="text-xs font-semibold" style={{ color: '#fca5a5' }}>Card failed to load</p>
                      <p className="text-[11px]" style={{ color: 'var(--text-3)', lineHeight: 1.5 }}>
                        Make sure your WakaTime profile is <strong style={{ color: '#fff' }}>Public</strong> and you have tracked coding activity.
                      </p>
                      <a href="https://wakatime.com/settings/account" target="_blank" rel="noreferrer"
                         className="text-[11px] px-2.5 py-1 rounded-lg" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }}>
                        Open WakaTime Settings →
                      </a>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      {!imgLoaded && (
                        <div className="flex items-center justify-center gap-2 py-4">
                          <div className="w-4 h-4 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
                          <p className="text-xs" style={{ color: 'var(--text-3)' }}>Loading card…</p>
                        </div>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={`${previewKey}-${username}-${wakatime.cardTheme}-${wakatime.layoutStyle}-${wakatime.statsRange}`}
                        src={wakaCardUrl}
                        alt="WakaTime Stats Preview"
                        className="w-full rounded-lg"
                        style={{ display: imgLoaded ? 'block' : 'none' }}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => { setImgError(true); setImgLoaded(false); }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* GitHub Action */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13.5px] font-semibold text-white">⚡ Auto-Update via GitHub Action</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Generates a waka.yml workflow file for daily auto-updates</p>
          </div>
          <label className="toggle"><input id="wakaAction" type="checkbox" checked={wakatime.enableAction} onChange={e => setWakaTime({ enableAction: e.target.checked })} /><span className="toggle-track" /></label>
        </div>

        {wakatime.enableAction && (
          <div className="flex flex-col gap-1">
            <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>What to include in the auto-updated section:</p>
            <Toggle id="wakaDailyTime" label="⏱️ Daily coding time" checked={wakatime.showDailyTime} onChange={v => setWakaTime({ showDailyTime: v })} />
            <Toggle id="wakaLangs"     label="💻 Language breakdown" checked={wakatime.showLanguages}  onChange={v => setWakaTime({ showLanguages: v })} />
            <Toggle id="wakaEditors"   label="🛠️ Editor breakdown"   checked={wakatime.showEditors}   onChange={v => setWakaTime({ showEditors: v })} />
            <Toggle id="wakaProjects"  label="📁 Project breakdown"  checked={wakatime.showProjects}  onChange={v => setWakaTime({ showProjects: v })} />
            <div className="mt-3">
              <label className="label">Time Format</label>
              <div className="flex gap-2">
                {[['digital','1h 30m'],['decimal','1.5 hrs']].map(([val, lbl]) => (
                  <button key={val} onClick={() => setWakaTime({ timeFormat: val })}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    style={{
                      background: wakatime.timeFormat === val ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.04)',
                      border: wakatime.timeFormat === val ? '1px solid rgba(236,72,153,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      color: wakatime.timeFormat === val ? '#fb7185' : 'var(--text-3)',
                    }}>
                    {lbl} ({val})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
