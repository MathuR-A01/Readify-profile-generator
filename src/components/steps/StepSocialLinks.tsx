'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { Link2 } from 'lucide-react';

const SOCIALS = [
  { key: 'github'   as const, icon: '🐙', label: 'GitHub',    placeholder: 'https://github.com/yourusername', color: '#c9d1d9' },
  { key: 'linkedin' as const, icon: '💼', label: 'LinkedIn',   placeholder: 'https://linkedin.com/in/yourusername', color: '#0a66c2' },
  { key: 'twitter'  as const, icon: '🐦', label: 'Twitter / X', placeholder: 'https://twitter.com/yourusername', color: '#1d9bf0' },
  { key: 'instagram'as const, icon: '📸', label: 'Instagram',  placeholder: 'https://instagram.com/yourusername', color: '#e1306c' },
  { key: 'youtube'  as const, icon: '▶️', label: 'YouTube',    placeholder: 'https://youtube.com/@yourchannel', color: '#ff0000' },
  { key: 'devto'    as const, icon: '👩‍💻', label: 'Dev.to',    placeholder: 'https://dev.to/yourusername', color: '#9ebfe7' },
  { key: 'hashnode' as const, icon: '📝', label: 'Hashnode',   placeholder: 'https://hashnode.com/@yourusername', color: '#2962ff' },
  { key: 'medium'   as const, icon: '✍️', label: 'Medium',     placeholder: 'https://medium.com/@yourusername', color: '#ffce54' },
  { key: 'discord'  as const, icon: '💬', label: 'Discord',    placeholder: 'Discord invite link or username', color: '#5865f2' },
  { key: 'telegram' as const, icon: '✈️', label: 'Telegram',   placeholder: 'https://t.me/yourusername', color: '#0088cc' },
];

export default function StepSocialLinks() {
  const { social, setSocial } = useProfileStore();
  return (
    <div className="step-panel flex flex-col gap-3">
      <h2 className="section-title"><Link2 size={19} style={{ color: 'var(--violet)' }} /> Social Links</h2>
      <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>
        Links render as styled badge buttons in your README. Leave blank to skip any platform.
      </p>
      {SOCIALS.map(({ key, icon, label, placeholder }) => (
        <div key={key} className="social-row">
          <div className="social-icon" style={{ fontSize: '18px' }}>{icon}</div>
          <div className="flex-1">
            <label className="label" style={{ marginBottom: 3 }}>{label}</label>
            <input id={`social-${key}`} className="input" placeholder={placeholder}
              value={social[key]} onChange={e => setSocial({ [key]: e.target.value })} />
          </div>
        </div>
      ))}
    </div>
  );
}
