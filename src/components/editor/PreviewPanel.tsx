'use client';
import { useState, useCallback, useMemo } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Download, Check, Eye, Code2 } from 'lucide-react';

export default function PreviewPanel() {
  const store = useProfileStore();
  const [tab, setTab] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);

  const md = useMemo(() => generateMarkdown(store), [store]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [md]);

  const download = useCallback(() => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
    a.download = 'README.md';
    a.click();
  }, [md]);

  const lines = md.split('\n').length;
  const bytes = new Blob([md]).size;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div className="preview-toolbar" style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, flexShrink: 0,
        background: 'rgba(6,8,16,0.5)',
      }}>
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <button id="previewTabBtn" className={`tab-btn ${tab === 'preview' ? 'on' : 'off'}`} onClick={() => setTab('preview')}>
            <Eye size={12} style={{ display: 'inline', marginRight: 5 }} />Preview
          </button>
          <button id="rawTabBtn" className={`tab-btn ${tab === 'raw' ? 'on' : 'off'}`} onClick={() => setTab('raw')}>
            <Code2 size={12} style={{ display: 'inline', marginRight: 5 }} />Raw
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button id="copyBtn" className="btn btn-outline btn-sm" onClick={copy}>
            {copied ? <Check size={12} style={{ color: 'var(--green)' }} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button id="downloadBtn" className="btn btn-primary btn-sm" onClick={download}>
            <Download size={12} /> .md
          </button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px' }}>
        {!md.trim() ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, textAlign: 'center' }}>
            <span style={{ fontSize: 36 }}>✍️</span>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-2)' }}>Your README will appear here</p>
            <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Fill in the form on the left to see a live preview</p>
          </div>
        ) : tab === 'preview' ? (
          <div className="md-preview prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{md}</ReactMarkdown>
          </div>
        ) : (
          <div className="code-view">{md}</div>
        )}
      </div>

      {/* Footer stats bar */}
      <div style={{
        padding: '6px 14px',
        borderTop: '1px solid rgba(99,102,241,0.08)',
        display: 'flex', gap: 16, flexShrink: 0,
        background: 'rgba(6,8,16,0.4)',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{lines} lines</span>
        <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{bytes} bytes</span>
        <span style={{ fontSize: '11px', color: 'var(--green)' }}>● Live</span>
      </div>
    </div>
  );
}
