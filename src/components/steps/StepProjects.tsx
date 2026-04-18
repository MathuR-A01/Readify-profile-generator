'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import { Project } from '@/types';

const uid = () => Math.random().toString(36).slice(2, 9);

export default function StepProjects() {
  const { projects, setProjects } = useProfileStore();

  const add = () => setProjects([...projects, { id: uid(), name: '', description: '', tech: '', repoUrl: '', demoUrl: '' }]);
  const del = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const upd = (id: string, patch: Partial<Project>) => setProjects(projects.map(p => p.id === id ? { ...p, ...patch } : p));

  return (
    <div className="step-panel">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title mb-0"><FolderOpen size={19} style={{ color: 'var(--violet)' }} /> Featured Projects</h2>
        <button id="addProjectBtn" className="btn btn-primary btn-sm" onClick={add}>
          <Plus size={13} /> Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-10 rounded-xl" style={{ border: '2px dashed rgba(99,102,241,0.2)' }}>
          <FolderOpen size={30} style={{ margin: '0 auto 10px', color: 'var(--text-3)', opacity: 0.5 }} />
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>No projects yet — click Add Project above</p>
        </div>
      )}

      {projects.map((p, i) => (
        <div key={p.id} id={`project-card-${i + 1}`} className="project-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>Project {i + 1}</span>
            <button onClick={() => del(p.id)} className="btn-ghost text-xs" style={{ color: 'var(--red)' }}>
              <Trash2 size={13} /> Remove
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="label">Project Name</label>
              <input className="input" placeholder="My Awesome Project"
                value={p.name} onChange={e => upd(p.id, { name: e.target.value })} />
            </div>
            <div>
              <label className="label">Short Description</label>
              <textarea className="input" style={{ minHeight: 58 }} placeholder="What does this project do? What problem does it solve?"
                value={p.description} onChange={e => upd(p.id, { description: e.target.value })} />
            </div>
            <div>
              <label className="label">Tech Stack Used</label>
              <input className="input" placeholder="React, Node.js, PostgreSQL, Docker..."
                value={p.tech} onChange={e => upd(p.id, { tech: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">GitHub Repo URL</label>
                <input className="input" placeholder="https://github.com/you/repo"
                  value={p.repoUrl} onChange={e => upd(p.id, { repoUrl: e.target.value })} />
              </div>
              <div>
                <label className="label">Live Demo URL</label>
                <input className="input" placeholder="https://yourapp.vercel.app"
                  value={p.demoUrl} onChange={e => upd(p.id, { demoUrl: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {projects.length > 0 && (
        <button id="addMoreProjectBtn" className="w-full text-sm font-medium py-2.5 rounded-lg mt-2 cursor-pointer transition-all"
          style={{ background: 'transparent', border: '1px dashed rgba(124,58,237,0.3)', color: 'var(--violet)' }}
          onClick={add}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.06)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
          + Add Another Project
        </button>
      )}
    </div>
  );
}
