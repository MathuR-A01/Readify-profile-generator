'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { User, MapPin, Mail, Globe, Loader2, AtSign } from 'lucide-react';
import { useState } from 'react';

export default function StepPersonalInfo() {
  const { personal, setPersonal } = useProfileStore();
  const [fetching, setFetching] = useState(false);
  const [fetchMsg, setFetchMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const autoFill = async () => {
    if (!personal.githubUsername.trim()) return;
    // Strip full URL if user pasted it
    const cleanName = personal.githubUsername
      .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
      .replace(/\/$/, '').split('/')[0].trim();
    setFetching(true); setFetchMsg(null);
    try {
      const r = await fetch(`https://api.github.com/users/${cleanName}`);
      if (!r.ok) throw new Error('not found');
      const d = await r.json();
      setPersonal({
        fullName: d.name || personal.fullName,
        photoUrl: d.avatar_url || '',
        location: d.location || personal.location,
        email: d.email || personal.email,
        portfolioUrl: d.blog || personal.portfolioUrl,
        tagline: d.bio || personal.tagline,
      });
      setFetchMsg({ type: 'ok', text: '✓ Profile fetched from GitHub!' });
    } catch {
      setFetchMsg({ type: 'err', text: '✗ User not found. Check the username.' });
    }
    setFetching(false);
    setTimeout(() => setFetchMsg(null), 3500);
  };

  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title"><User size={19} style={{ color: 'var(--violet)' }} /> Personal Information</h2>

      {/* Full Name */}
      <div>
        <label className="label">Full Name</label>
        <div className="input-icon-wrap">
          <User size={14} />
          <input id="fullName" className="input" placeholder="John Doe"
            value={personal.fullName} onChange={e => setPersonal({ fullName: e.target.value })} />
        </div>
      </div>

      {/* GitHub Username + Auto-fill */}
      <div>
        <label className="label">GitHub Username</label>
        <div className="flex gap-2">
          <div className="input-icon-wrap flex-1">
            <AtSign size={14} />
            <input id="githubUsername" className="input" placeholder="johndoe"
              value={personal.githubUsername}
              onChange={e => {
                // Auto-strip github.com URL prefix as user types/pastes
                const val = e.target.value
                  .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
                  .replace(/\/$/, '').split('/')[0];
                setPersonal({ githubUsername: val });
              }} />
          </div>
          <button id="autoFillBtn" className="btn btn-outline btn-sm flex-shrink-0"
            onClick={autoFill} disabled={fetching || !personal.githubUsername.trim()}>
            {fetching ? <Loader2 size={13} className="animate-spin" /> : '⚡'}
            {fetching ? 'Fetching...' : 'Auto-fill'}
          </button>
        </div>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
          Enter only your username (e.g. <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 5px', borderRadius: 4 }}>johndoe</code>), not the full URL
        </p>
        {fetchMsg && (
          <p className="mt-1.5 text-xs" style={{ color: fetchMsg.type === 'ok' ? 'var(--green)' : 'var(--red)' }}>
            {fetchMsg.text}
          </p>
        )}
      </div>

      {/* Tagline */}
      <div>
        <label className="label">Tagline / One-liner</label>
        <input id="tagline" className="input" placeholder="Full Stack Dev | Open Source Enthusiast"
          value={personal.tagline} onChange={e => setPersonal({ tagline: e.target.value })} />
        <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>Appears in the animated wave header</p>
      </div>

      {/* Photo URL with preview */}
      <div>
        <label className="label">Profile Photo URL</label>
        <div className="flex gap-3 items-center">
          {personal.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={personal.photoUrl} alt="preview" className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
              style={{ border: '2px solid rgba(124,58,237,0.4)' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <input id="photoUrl" className="input" placeholder="https://avatars.githubusercontent.com/..."
            value={personal.photoUrl} onChange={e => setPersonal({ photoUrl: e.target.value })} />
        </div>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Location</label>
          <div className="input-icon-wrap">
            <MapPin size={14} />
            <input id="location" className="input" placeholder="New York, USA"
              value={personal.location} onChange={e => setPersonal({ location: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="label">Pronouns</label>
          <select id="pronouns" className="input"
            value={personal.pronouns} onChange={e => setPersonal({ pronouns: e.target.value })}>
            <option value="">Choose...</option>
            {['he/him','she/her','they/them','he/they','she/they'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Email</label>
          <div className="input-icon-wrap">
            <Mail size={14} />
            <input id="email" type="email" className="input" placeholder="hello@example.com"
              value={personal.email} onChange={e => setPersonal({ email: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="label">Portfolio Website</label>
          <div className="input-icon-wrap">
            <Globe size={14} />
            <input id="portfolioUrl" type="url" className="input" placeholder="https://johndoe.dev"
              value={personal.portfolioUrl} onChange={e => setPersonal({ portfolioUrl: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}
