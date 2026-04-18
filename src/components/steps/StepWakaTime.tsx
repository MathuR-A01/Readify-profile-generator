'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { Clock, Info } from 'lucide-react';

const RANGES  = ['last_7_days','last_30_days','last_6_months','last_year','all_time'];
const THEMES  = ['tokyonight','radical','merko','gruvbox','cobalt','dracula'];
const LAYOUTS = ['default','compact'];

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

  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title">
        <Clock size={19} style={{ color: '#ec4899' }} /> WakaTime Integration
        <span className="text-[10px] px-2 py-0.5 rounded-full ml-1 font-semibold"
              style={{ background: 'rgba(236,72,153,0.1)', color: '#fb7185', border: '1px solid rgba(236,72,153,0.3)' }}>
          ⭐ Star Feature
        </span>
      </h2>

      {/* Info */}
      <div className="info-box" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
        <Info size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color: '#fcd34d' }}>What is WakaTime?</p>
          <p className="text-xs" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
            WakaTime tracks your coding time across IDEs. Get a free account at{' '}
            <a href="https://wakatime.com" target="_blank" rel="noreferrer" style={{ color: '#f59e0b' }}>wakatime.com</a> and embed live stats in your README.
          </p>
        </div>
      </div>

      {/* Username */}
      <div>
        <label className="label">WakaTime Username</label>
        <input id="wakatimeUsername" className="input" placeholder="yourusername"
          value={wakatime.username} onChange={e => setWakaTime({ username: e.target.value })} />
      </div>

      {/* Stats card section */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13.5px] font-semibold text-white">📊 WakaTime Stats Card</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Embed a real-time coding stats card</p>
          </div>
          <label className="toggle"><input id="wakaShowCard" type="checkbox" checked={wakatime.showCard} onChange={e => setWakaTime({ showCard: e.target.checked })} /><span className="toggle-track" /></label>
        </div>

        {wakatime.showCard && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Stats Range</label>
              <select id="wakaRange" className="input"
                value={wakatime.statsRange} onChange={e => setWakaTime({ statsRange: e.target.value })}>
                {RANGES.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Card Theme</label>
              <div className="flex flex-wrap gap-2">
                {THEMES.map(t => (
                  <button key={t} onClick={() => setWakaTime({ cardTheme: t })}
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
            <div>
              <label className="label">Layout</label>
              <div className="flex gap-2">
                {LAYOUTS.map(l => (
                  <button key={l} onClick={() => setWakaTime({ layoutStyle: l })}
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
