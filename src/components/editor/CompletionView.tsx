'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import { cleanUsername } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Download, Check, ArrowLeft, PartyPopper, ExternalLink } from 'lucide-react';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export default function CompletionView() {
  const store = useProfileStore();
  const { setIsFinished } = store;
  const [copied, setCopied] = useState(false);

  const u = cleanUsername(store.personal.githubUsername);
  const md = useMemo(() => generateMarkdown(store), [store]);

  const rawPlugin = (rehypeRaw as any)?.default || rehypeRaw;
  const gfmPlugin = (remarkGfm as any)?.default || remarkGfm;

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

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#04060e] animate-in fade-in duration-500">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#060810]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsFinished(false)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Editor
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2 text-white font-display font-bold">
            <PartyPopper size={18} className="text-violet-400" />
            README Generated!
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={copy}
            className="btn btn-outline btn-sm gap-2 h-9 px-4 cursor-pointer"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied Markdown!' : 'Copy Markdown'}
          </button>
          <button 
            onClick={download}
            className="btn btn-primary btn-sm gap-2 h-9 px-4 shadow-lg shadow-violet-500/20 cursor-pointer"
          >
            <Download size={14} />
            Download README.md
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-hidden flex flex-col max-w-6xl mx-auto w-full p-6 lg:p-10">
        <div className="flex flex-col gap-6 h-full">
          {/* Success message card */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-display font-bold text-white mb-2">Your profile is ready to shine! ✨</h1>
              <p className="text-slate-400 text-sm max-w-lg">
                Your custom GitHub README has been generated with all your details, stats, and skills. 
                Next step: Copy it to your GitHub profile repository!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-w-[240px]">
              <a 
                href={`https://github.com/${u}/${u}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all"
              >
                <GithubIcon size={16} /> Open Your Profile Repo <ExternalLink size={14} />
              </a>
              <p className="text-[10px] text-slate-500 text-center">
                Make sure you have a repo named after your username!
              </p>
            </div>
          </div>

          {/* Preview Window */}
          <div className="flex-1 min-h-0 rounded-2xl border border-white/10 bg-[#0c0e18] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">README.md Preview</span>
            </div>
            <div className="flex-1 overflow-auto p-8 lg:p-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="md-preview prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[gfmPlugin]} rehypePlugins={[rawPlugin]}>{md}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
