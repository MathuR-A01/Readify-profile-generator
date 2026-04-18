'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { BookOpen, GraduationCap, Briefcase, Rocket } from 'lucide-react';

export default function StepAboutMe() {
  const { about, setAbout, profileType } = useProfileStore();

  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title"><BookOpen size={19} style={{ color: 'var(--violet)' }} /> About Me</h2>

      {/* ── Student fields ────────────────────────────────────────────── */}
      {profileType === 'student' && (
        <div className="p-4 rounded-xl flex flex-col gap-4"
             style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.22)' }}>
          <div className="flex items-center gap-2">
            <GraduationCap size={15} style={{ color: '#a78bfa' }} />
            <span className="text-xs font-semibold" style={{ color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Student Details
            </span>
          </div>
          <div>
            <label className="label">University / College</label>
            <input id="university" className="input" placeholder="MIT, Stanford, IIT Delhi, UCLA..."
              value={about.university} onChange={e => setAbout({ university: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Major / Degree</label>
              <input id="major" className="input" placeholder="B.Tech CS, BSc Data Science..."
                value={about.major} onChange={e => setAbout({ major: e.target.value })} />
            </div>
            <div>
              <label className="label">Expected Graduation</label>
              <input id="graduationYear" className="input" placeholder="2025, 2026..."
                value={about.graduationYear} onChange={e => setAbout({ graduationYear: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* ── Professional fields ───────────────────────────────────────── */}
      {profileType === 'professional' && (
        <div className="p-4 rounded-xl flex flex-col gap-4"
             style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.22)' }}>
          <div className="flex items-center gap-2">
            <Briefcase size={15} style={{ color: '#7dd3fc' }} />
            <span className="text-xs font-semibold" style={{ color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Professional Details
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Job Title</label>
              <input id="jobTitle" className="input" placeholder="Senior Software Engineer"
                value={about.jobTitle} onChange={e => setAbout({ jobTitle: e.target.value })} />
            </div>
            <div>
              <label className="label">Company / Employer</label>
              <input id="company" className="input" placeholder="Google, Meta, Startup..."
                value={about.company} onChange={e => setAbout({ company: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Years of Experience</label>
            <select id="yearsOfExperience" className="input"
              value={about.yearsOfExperience} onChange={e => setAbout({ yearsOfExperience: e.target.value })}>
              <option value="">Select range...</option>
              <option value="0–1 years (Graduate)">0–1 years (Graduate)</option>
              <option value="1–3 years (Junior)">1–3 years (Junior)</option>
              <option value="3–5 years (Mid-level)">3–5 years (Mid-level)</option>
              <option value="5–8 years (Senior)">5–8 years (Senior)</option>
              <option value="8+ years (Staff / Principal)">8+ years (Staff / Principal)</option>
            </select>
          </div>
        </div>
      )}

      {/* ── Expert fields ─────────────────────────────────────────────── */}
      {profileType === 'expert' && (
        <div className="p-4 rounded-xl flex flex-col gap-4"
             style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.22)' }}>
          <div className="flex items-center gap-2">
            <Rocket size={15} style={{ color: '#fcd34d' }} />
            <span className="text-xs font-semibold" style={{ color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Expert / OSS Details
            </span>
          </div>
          <div>
            <label className="label">Area of Specialization</label>
            <input id="specialization" className="input"
              placeholder="Distributed Systems, ML Infrastructure, Web Security..."
              value={about.specialization} onChange={e => setAbout({ specialization: e.target.value })} />
          </div>
          <div>
            <label className="label">Open Source Contributions</label>
            <input id="openSourceContribs" className="input"
              placeholder="Core contributor to React, Creator of XYZ library..."
              value={about.openSourceContribs} onChange={e => setAbout({ openSourceContribs: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Mentoring</label>
              <input id="mentoring" className="input" placeholder="100+ devs on ADPList..."
                value={about.mentoring} onChange={e => setAbout({ mentoring: e.target.value })} />
            </div>
            <div>
              <label className="label">Speaking / Conferences</label>
              <input id="speaking" className="input" placeholder="JSConf, React Summit 2024..."
                value={about.speaking} onChange={e => setAbout({ speaking: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {/* ── Common fields ─────────────────────────────────────────────── */}
      <div>
        <label className="label">Short Bio</label>
        <textarea id="bio" className="input" style={{ minHeight: 80 }}
          placeholder="Passionate developer who loves building things that matter. I believe in clean code, great UX, and open collaboration..."
          value={about.bio} onChange={e => setAbout({ bio: e.target.value })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">🔭 Currently Working On</label>
          <input id="workingOn" className="input" placeholder="An open-source DevTool..."
            value={about.workingOn} onChange={e => setAbout({ workingOn: e.target.value })} />
        </div>
        <div>
          <label className="label">🌱 Currently Learning</label>
          <input id="learning" className="input" placeholder="Rust, LLM fine-tuning..."
            value={about.learning} onChange={e => setAbout({ learning: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">👯 Looking to Collaborate On</label>
          <input id="collaborateOn" className="input" placeholder="Open-source AI projects..."
            value={about.collaborateOn} onChange={e => setAbout({ collaborateOn: e.target.value })} />
        </div>
        <div>
          <label className="label">💬 Ask Me About</label>
          <input id="askMeAbout" className="input" placeholder="React, system design..."
            value={about.askMeAbout} onChange={e => setAbout({ askMeAbout: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="label">⚡ Fun Fact</label>
        <input id="funFact" className="input" placeholder="I can solve a Rubik's cube in under 2 minutes!"
          value={about.funFact} onChange={e => setAbout({ funFact: e.target.value })} />
      </div>
    </div>
  );
}
