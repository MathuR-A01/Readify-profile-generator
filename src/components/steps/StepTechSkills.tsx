'use client';
import React, { useState } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { SKILLS_DATA, CATEGORY_LABELS, SkillCategory } from '@/lib/data';
import { Code2, Search, X, Plus, Sparkles } from 'lucide-react';

const CATS = Object.keys(SKILLS_DATA) as SkillCategory[];

export default function StepTechSkills() {
  const { skills, setSkills } = useProfileStore();
  const [activeTab, setActiveTab] = useState<SkillCategory>('languages');
  const [search, setSearch] = useState('');
  const [customInput, setCustomInput] = useState('');

  const toggle = (cat: SkillCategory, name: string) => {
    const cur = skills[cat] ?? [];
    setSkills({ [cat]: cur.includes(name) ? cur.filter(s => s !== name) : [...cur, name] });
  };

  const addCustomSkill = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const curCustom = skills.custom ?? [];
    if (!curCustom.includes(trimmed)) {
      setSkills({ custom: [...curCustom, trimmed] });
    }
    setCustomInput('');
    setActiveTab('custom');
  };

  const totalSelected = CATS.reduce((sum, c) => sum + (skills[c]?.length ?? 0), 0);

  // Combine predefined skills with user custom skills
  const getSkillsForCat = (cat: SkillCategory): string[] => {
    if (cat === 'custom') {
      return skills.custom ?? [];
    }
    return (SKILLS_DATA[cat] as readonly string[]) || [];
  };

  type SkillEntry = { name: string; cat: SkillCategory };
  const list: SkillEntry[] = search.trim()
    ? CATS.flatMap(cat => getSkillsForCat(cat)
        .filter(n => n.toLowerCase().includes(search.toLowerCase()))
        .map(name => ({ name, cat })))
    : getSkillsForCat(activeTab).map(name => ({ name, cat: activeTab }));

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
              {cat === 'custom' && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const filtered = (skills.custom ?? []).filter(s => s !== name);
                    setSkills({ custom: filtered });
                  }}
                  className="ml-1 hover:text-red-400 font-bold"
                  style={{ fontSize: 12 }}
                >
                  ×
                </span>
              )}
            </button>
          );
        })}
        {list.length === 0 && (
          <p className="text-xs p-2" style={{ color: 'var(--text-3)' }}>
            {activeTab === 'custom'
              ? 'No custom skills added yet. Add one below!'
              : `No skills match "${search}"`}
          </p>
        )}
      </div>

      {/* Add Custom Skill Box */}
      <div className="p-3.5 rounded-xl flex flex-col gap-2.5"
           style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)' }}>
        <p className="text-xs font-semibold text-white flex items-center gap-1.5">
          <Sparkles size={14} style={{ color: '#c4b5fd' }} /> Add Custom Skill or Technology
        </p>
        <div className="flex gap-2">
          <input
            id="customSkillInput"
            className="input flex-1"
            placeholder="e.g. WebGL, ROS, CUDA, WebSockets, Solana..."
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); } }}
          />
          <button
            id="addCustomSkillBtn"
            onClick={addCustomSkill}
            disabled={!customInput.trim()}
            className="btn btn-primary btn-sm flex-shrink-0 gap-1 shadow-md shadow-violet-500/20"
          >
            <Plus size={14} /> Add Skill
          </button>
        </div>
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
