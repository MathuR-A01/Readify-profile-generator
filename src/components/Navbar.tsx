'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Zap, Star, Menu, X, GitBranch } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>
            <Zap size={15} className="text-white" />
          </div>
          <span className="font-display font-bold text-[17px] text-white">
          Read<span className="gradient-text">ify</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 text-[13.5px]" style={{ color: 'var(--text-2)' }}>
          {[['/', 'Home'], ['/editor', 'Generator']].map(([href, label]) => (
            <Link key={href} href={href}
              className="transition-colors hover:text-white no-underline"
              style={{ color: 'var(--text-2)' }}>
              {label}
            </Link>
          ))}
          <a href="https://github.com/MathuR-A01" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
            style={{ color: 'var(--text-2)', textDecoration: 'none' }}>
            <GitBranch size={14} /> GitHub
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
               style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
            <Star size={11} fill="#f59e0b" /> Star us
          </div>
          <Link href="/editor">
            <button className="btn btn-primary btn-sm">
              <Zap size={13} /> Generate README
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden btn-ghost" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-14 left-0 right-0 px-6 pb-4 pt-3 z-50"
             style={{ background: 'rgba(6,8,16,0.97)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex flex-col gap-3 text-sm" style={{ color: 'var(--text-2)' }}>
            <Link href="/" onClick={() => setOpen(false)} style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Home</Link>
            <Link href="/editor" onClick={() => setOpen(false)} style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Generator</Link>
            <Link href="/editor" onClick={() => setOpen(false)}>
              <button className="btn btn-primary btn-sm w-full justify-center mt-1">
                <Zap size={13} /> Generate README
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
