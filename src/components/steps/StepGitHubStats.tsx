'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { BarChart3, Info } from 'lucide-react';

const THEMES  = ['tokyonight','radical','merko','gruvbox','cobalt','dracula','github_dark','nord','onedark'];
const LAYOUTS = ['compact','default','donut','pie'];

function Row({ id, label, desc, checked, onChange }: {
  id: string; label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div>
        <p className="text-[13.5px] font-medium text-white">{label}</p>
        {desc && <p className="text-xs" style={{ color: 'var(--text-3)' }}>{desc}</p>}
      </div>
      <label className="toggle ml-4">
        <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-track" />
      </label>
    </div>
  );
}

export default function StepGitHubStats() {
  const { githubStats, setGithubStats } = useProfileStore();

  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title"><BarChart3 size={19} style={{ color: 'var(--violet)' }} /> GitHub Stats</h2>

      {/* Toggles */}
      <div className="card p-4">
        <Row id="showStats"     label="📊 Stats Card"            desc="Commits, PRs, issues, stars"             checked={githubStats.showStats}         onChange={v => setGithubStats({ showStats: v })} />
        <Row id="showLanguages" label="🗂️ Top Languages Card"   desc="Most used programming languages"         checked={githubStats.showLanguages}     onChange={v => setGithubStats({ showLanguages: v })} />
        <Row id="showStreak"    label="🔥 Streak Stats"          desc="Current & longest contribution streak"   checked={githubStats.showStreak}        onChange={v => setGithubStats({ showStreak: v })} />
        <Row id="showTrophies"  label="🏆 GitHub Trophies"       desc="Achievement badges from activity"        checked={githubStats.showTrophies}      onChange={v => setGithubStats({ showTrophies: v })} />
        <Row id="showViews"     label="👁️ Profile Views Counter" desc="Badge tracking profile visitors"         checked={githubStats.showViews}         onChange={v => setGithubStats({ showViews: v })} />

        {/* Activity Graph toggle + source choice */}
        <div className="py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13.5px] font-medium text-white">📈 Activity / Contribution Graph</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>Visual contribution timeline</p>
            </div>
            <label className="toggle ml-4">
              <input id="showGraph" type="checkbox" checked={githubStats.showActivityGraph}
                onChange={e => setGithubStats({ showActivityGraph: e.target.checked })} />
              <span className="toggle-track" />
            </label>
          </div>

          {/* Graph source choice — only visible when toggle is ON */}
          {githubStats.showActivityGraph && (
            <div className="mt-3 p-3 rounded-xl flex flex-col gap-2"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p className="text-[11.5px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                Choose Graph Source
              </p>
              <div className="flex gap-2 flex-wrap">
                {/* Normal GitHub Activity Graph */}
                <button
                  id="graphSourceGitHub"
                  onClick={() => setGithubStats({ activityGraphSource: 'github' })}
                  className="flex-1 py-2.5 px-3 rounded-lg text-left transition-all cursor-pointer"
                  style={{
                    background: githubStats.activityGraphSource === 'github'
                      ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                    border: githubStats.activityGraphSource === 'github'
                      ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                  <p className="text-[12.5px] font-semibold" style={{
                    color: githubStats.activityGraphSource === 'github' ? '#a5b4fc' : 'var(--text-2)'
                  }}>
                    🐙 GitHub Activity Graph
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                    Standard commit contribution heatmap
                  </p>
                </button>

                {/* WakaTime Graph */}
                <button
                  id="graphSourceWakaTime"
                  onClick={() => setGithubStats({ activityGraphSource: 'wakatime' })}
                  className="flex-1 py-2.5 px-3 rounded-lg text-left transition-all cursor-pointer"
                  style={{
                    background: githubStats.activityGraphSource === 'wakatime'
                      ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.03)',
                    border: githubStats.activityGraphSource === 'wakatime'
                      ? '1px solid rgba(236,72,153,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                  <p className="text-[12.5px] font-semibold" style={{
                    color: githubStats.activityGraphSource === 'wakatime' ? '#fb7185' : 'var(--text-2)'
                  }}>
                    ⏱️ WakaTime Coding Graph
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                    Real coding time per language/editor (needs WakaTime username in Step 7)
                  </p>
                </button>
              </div>

              {/* WakaTime setup guide */}
              {githubStats.activityGraphSource === 'wakatime' && (
                <div className="mt-2 p-3 rounded-lg flex gap-2.5"
                     style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <Info size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p className="text-[11.5px] font-semibold mb-1.5" style={{ color: '#fcd34d' }}>
                      How to set up WakaTime real-time stats:
                    </p>
                    <ol className="flex flex-col gap-1" style={{ color: 'var(--text-2)', fontSize: '11px', paddingLeft: 14 }}>
                      <li>1. Sign up free at <a href="https://wakatime.com" target="_blank" rel="noreferrer" style={{ color: '#f59e0b' }}>wakatime.com</a></li>
                      <li>2. Install the WakaTime plugin in your IDE (VS Code, JetBrains, etc.)</li>
                      <li>3. Copy your API key from <strong style={{ color: 'var(--text-2)' }}>wakatime.com/settings/account</strong></li>
                      <li>4. Paste your WakaTime username in the <strong style={{ color: '#fb7185' }}>WakaTime step</strong> (Step 7 for Expert)</li>
                      <li>5. Your coding activity graph will auto-update daily in your README ✅</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="label">Stats Card Theme</label>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(t => (
            <button key={t} id={`statsTheme-${t}`}
              onClick={() => setGithubStats({ statsTheme: t })}
              className="text-xs py-2 px-3 rounded-lg font-medium transition-all cursor-pointer"
              style={{
                background: githubStats.statsTheme === t ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                border: githubStats.statsTheme === t ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: githubStats.statsTheme === t ? '#c4b5fd' : 'var(--text-3)',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Language card layout */}
      <div>
        <label className="label">Languages Card Layout</label>
        <div className="flex flex-wrap gap-2">
          {LAYOUTS.map(l => (
            <button key={l} id={`statsLayout-${l}`}
              onClick={() => setGithubStats({ statsLayout: l })}
              className="text-xs py-2 px-3 rounded-lg font-medium transition-all cursor-pointer"
              style={{
                background: githubStats.statsLayout === l ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                border: githubStats.statsLayout === l ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: githubStats.statsLayout === l ? '#c4b5fd' : 'var(--text-3)',
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
