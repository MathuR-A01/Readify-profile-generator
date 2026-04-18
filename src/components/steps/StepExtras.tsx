'use client';
import { useProfileStore } from '@/store/useProfileStore';
import { Sparkles } from 'lucide-react';

function Toggle({ id, label, desc, checked, onChange }: { id: string; label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div><p className="text-[13.5px] font-medium text-white">{label}</p>{desc && <p className="text-xs" style={{ color: 'var(--text-3)' }}>{desc}</p>}</div>
      <label className="toggle ml-4"><input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} /><span className="toggle-track" /></label>
    </div>
  );
}

export default function StepExtras() {
  const { extras, setExtras } = useProfileStore();
  return (
    <div className="step-panel flex flex-col gap-5">
      <h2 className="section-title"><Sparkles size={19} style={{ color: 'var(--violet)' }} /> Extras & Polish</h2>

      {/* Typing SVG */}
      <div>
        <label className="label">🖊️ Typing Animation Texts</label>
        <textarea id="typingTexts" className="input" style={{ minHeight: 60 }}
          placeholder="I build cool stuff, Open Source enthusiast, Full Stack Developer, Coffee lover ☕"
          value={extras.typingTexts} onChange={e => setExtras({ typingTexts: e.target.value })} />
        <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>Separate multiple texts with commas — renders as animated typing SVG</p>
      </div>

      {/* Optional URLs */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="label">☕ Buy Me a Coffee URL</label>
          <input id="buyMeCoffeeUrl" className="input" placeholder="https://buymeacoffee.com/yourusername"
            value={extras.buyMeCoffeeUrl} onChange={e => setExtras({ buyMeCoffeeUrl: e.target.value })} />
        </div>
        <div>
          <label className="label">📧 Hire Me Email</label>
          <input id="hireMeEmail" className="input" type="email" placeholder="hire@yourdomain.com"
            value={extras.hireMeEmail} onChange={e => setExtras({ hireMeEmail: e.target.value })} />
          <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>Creates a &quot;Hire Me&quot; badge button linking to your email</p>
        </div>
      </div>

      {/* Toggle options */}
      <div className="card p-4">
        <Toggle id="showWave"      label="🌊 Animated Wave Header"   desc="Gradient capsule-render wave banner at top & bottom" checked={extras.showWave}          onChange={v => setExtras({ showWave: v })} />
        <Toggle id="showDividers"  label="〰️ Section Dividers"       desc="Horizontal separator lines between sections"          checked={extras.showDividers}     onChange={v => setExtras({ showDividers: v })} />
        <Toggle id="showEmoji"     label="😄 Emoji Section Headers"  desc="Adds emojis before each section title"               checked={extras.showEmojiHeaders} onChange={v => setExtras({ showEmojiHeaders: v })} />
      </div>
    </div>
  );
}
