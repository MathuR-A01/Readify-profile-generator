'use client';
import { useState } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { SKILLS_DATA, CATEGORY_LABELS, SkillCategory } from '@/lib/data';
import { Code2, Search, X } from 'lucide-react';

const CATS = Object.keys(SKILLS_DATA) as SkillCategory[];

export default function StepTechSkills() {
  const { skills, setSkills } = useProfileStore();
  const [activeTab, setActiveTab] = useState<SkillCategory>('languages');
  const [search, setSearch] = useState('');

  const toggle = (cat: SkillCategory, name: string) => {
    const cur = skills[cat] ?? [];
    setSkills({ [cat]: cur.includes(name) ? cur.filter(s => s !== name) : [...cur, name] });
  };

  const totalSelected = CATS.reduce((sum, c) => sum + (skills[c]?.length ?? 0), 0);

  // Build list to show
  type SkillEntry = { name: string; cat: SkillCategory };
  const list: SkillEntry[] = search.trim()
    ? CATS.flatMap(cat => (SKILLS_DATA[cat] as readonly string[])
        .filter(n => n.toLowerCase().includes(search.toLowerCase()))
        .map(name => ({ name, cat })))
    : (SKILLS_DATA[activeTab] as readonly string[]).map(name => ({ name, cat: activeTab }));

  return (
    <div className="step-panel flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="section-title mb-0"><Code2 size={19} style={{ color: 'var(--violet)' }} /> Tech Skills</h2>
        {totalSelected > 0 && (
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(124,58,237,0.18)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.3)' }}>
            {totalSelected} selected
          </span>
        )}
      </div>

      {/* Search */}
      <div className="input-icon-wrap relative">
        <Search size={14} />
        <input id="skillSearch" className="input" placeholder="Search across all categories..."
          value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: search ? 32 : undefined }} />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 btn-ghost"
                  style={{ padding: '2px 6px' }}>
            <X size={12} />
          </button>
        )}
      </div>

      {/* Category tabs */}
      {!search && (
        <div className="flex flex-wrap gap-1.5">
          {CATS.map(cat => {
            const cnt = skills[cat]?.length ?? 0;
            return (
              <button key={cat} onClick={() => setActiveTab(cat)}
                className="text-[11.5px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer"
                style={{
                  background: activeTab === cat ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.04)',
                  border: activeTab === cat ? '1px solid rgba(124,58,237,0.45)' : '1px solid rgba(255,255,255,0.08)',
                  color: activeTab === cat ? '#c4b5fd' : 'var(--text-3)',
                }}>
                {CATEGORY_LABELS[cat]}{cnt > 0 && <span style={{ color: 'var(--violet)', fontWeight: 700 }}> ({cnt})</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Skill grid */}
      <div className="flex flex-wrap gap-1.5 p-3 rounded-xl min-h-[90px]"
           style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {list.map(({ name, cat }) => {
          const on = (skills[cat] ?? []).includes(name);
          return (
            <button key={`${cat}-${name}`}
              id={`skill-${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
              onClick={() => toggle(cat, name)}
              className={`skill-badge ${on ? 'on' : ''}`}>
              {on && <span style={{ fontSize: 10 }}>✓</span>}
              {name}
            </button>
          );
        })}
        {list.length === 0 && <p className="text-xs p-2" style={{ color: 'var(--text-3)' }}>No skills match "{search}"</p>}
      </div>

      {/* Selected chips with remove */}
      {totalSelected > 0 && (
        <div>
          <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Selected — will render as badges in your README:</p>
          <div className="flex flex-wrap gap-1.5">
            {CATS.flatMap(cat => (skills[cat] ?? []).map(name => (
              <span key={`sel-${cat}-${name}`} className="skill-badge on">
                {name}
                <button onClick={() => toggle(cat, name)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--violet)', lineHeight: 1, padding: 0, marginLeft: 2, fontSize: 13 }}>
                  ×
                </button>
              </span>
            )))}
          </div>
        </div>
      )}
    </div>
  );
}
