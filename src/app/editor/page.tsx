'use client';
import Navbar from '@/components/Navbar';
import FormPanel from '@/components/editor/FormPanel';
import PreviewPanel from '@/components/editor/PreviewPanel';
import StepProgress from '@/components/editor/StepProgress';
import CompletionView from '@/components/editor/CompletionView';
import { useProfileStore } from '@/store/useProfileStore';
import { PROFILE_TYPE_META } from '@/lib/data';

export default function EditorPage() {
  const { profileType, isFinished } = useProfileStore();
  const meta = PROFILE_TYPE_META[profileType];

  return (
    <div className="editor-page-root" style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar />

      {/* Profile type bar + step progress */}
      <div style={{ background: 'rgba(6,8,16,0.95)', borderBottom: '1px solid rgba(99,102,241,0.1)', flexShrink: 0 }}>
        {/* Profile badge row */}
        <div className="profile-badge-row" style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(99,102,241,0.07)' }}>
          <span style={{ fontSize: 20 }}>{meta.icon}</span>
          <div>
            <span className="font-semibold text-white text-sm">{meta.label} Profile</span>
            <span style={{ fontSize: '12px', color: 'var(--text-3)', marginLeft: 10 }}>{meta.tagline}</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="live-badge text-[11px] px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}>
              ✦ Live Preview
            </span>
          </div>
        </div>
        <StepProgress />
      </div>

      {/* Main split */}
      <div className="editor-split" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Form */}
        <div className="editor-form-pane"
             style={{ width: '42%', borderRight: '1px solid rgba(99,102,241,0.12)', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(6,8,16,0.7)' }}>
          <FormPanel />
        </div>

        {/* Right: Live Preview */}
        <div className="editor-preview-pane"
             style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(4,6,14,0.85)' }}>
          <PreviewPanel />
        </div>
      </div>

      {/* Full-screen completion overlay */}
      {isFinished && <CompletionView />}
    </div>
  );
}
