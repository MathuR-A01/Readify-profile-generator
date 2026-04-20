'use client';
import { useState, useCallback, useMemo } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Download, Check, ArrowLeft, PartyPopper, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function CompletionView() {
  const store = useProfileStore();
  const { setIsFinished } = store;
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
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
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
            className="btn btn-outline btn-sm gap-2 h-9 px-4"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied Markdown!' : 'Copy Markdown'}
          </button>
          <button 
            onClick={download}
            className="btn btn-primary btn-sm gap-2 h-9 px-4 shadow-lg shadow-violet-500/20"
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
                href={`https://github.com/${store.personal.githubUsername}/${store.personal.githubUsername}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all"
              >
                <FaGithub size={16} /> Open Your Profile Repo <ExternalLink size={14} />
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
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{md}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
