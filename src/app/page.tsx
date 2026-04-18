'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Zap, Star, ChevronRight, Eye, Download, Code2, Sparkles, BarChart3, Shield, Globe, Clock, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  { icon: Eye,        color: '#7c3aed', title: 'Live Split Preview',      desc: 'Watch your README render instantly as you fill the form — real-time, zero lag.' },
  { icon: Sparkles,   color: '#0ea5e9', title: '3 Profile Templates',     desc: 'Student, Professional, Expert — each with unique fields tuned to your career.' },
  { icon: Code2,      color: '#10b981', title: '200+ Skill Badges',       desc: 'Searchable badge picker with shields.io badges for every tech stack imaginable.' },
  { icon: BarChart3,  color: '#f59e0b', title: 'GitHub Stats Cards',      desc: 'Stats, streaks, trophies, activity graph — all toggleable and themeable.' },
  { icon: Clock,      color: '#ec4899', title: 'WakaTime Integration',    desc: 'Embed real coding activity stats and auto-update via GitHub Actions.' },
  { icon: Globe,      color: '#6366f1', title: '10+ README Themes',       desc: 'Tokyo Night, Dracula, Nord, Radical Neon — pick the perfect aesthetic.' },
  { icon: Download,   color: '#14b8a6', title: 'One-click Download',      desc: 'Copy to clipboard or download your README.md instantly. No login ever.' },
  { icon: Shield,     color: '#f43f5e', title: 'Privacy First',           desc: 'Zero server storage. Everything stays in your browser. Your keys stay yours.' },
];

const PROFILES = [
  {
    type: 'student' as const, icon: '🎓', label: 'Student',
    desc: 'Perfect for CS students, bootcamp grads, and fresh developers.',
    borderColor: '#7c3aed', glow: 'rgba(124,58,237,0.4)',
    features: ['University & Major', 'Expected Graduation', 'GitHub Stats', 'Skill Badges', 'Featured Projects', 'Social Links'],
  },
  {
    type: 'professional' as const, icon: '💼', label: 'Professional',
    desc: 'For working developers, engineers, and tech leads.',
    borderColor: '#0ea5e9', glow: 'rgba(14,165,233,0.4)',
    features: ['Job Title & Company', 'Years of Experience', 'Featured Projects', 'Full Tech Stack', 'GitHub Analytics', 'Social Links'],
  },
  {
    type: 'expert' as const, icon: '🚀', label: 'Expert / OSS',
    desc: 'For senior engineers, OSS contributors, speakers & mentors.',
    borderColor: '#f59e0b', glow: 'rgba(245,158,11,0.4)',
    features: ['Specialization & OSS', 'Mentoring & Speaking', 'WakaTime Live Stats', 'GitHub Actions Setup', 'Full Social Suite', 'Typing Animations'],
  },
];

const STATS = [
  { val: '10+',  label: 'README Themes' },
  { val: '200+', label: 'Skill Badges' },
  { val: '3',    label: 'Profile Templates' },
  { val: '100%', label: 'Free & Open Source' },
];

export default function HomePage() {
  return (
    <div className="hero-bg min-h-screen relative">
      <Navbar />

      {/* Orbs */}
      <div className="orb" style={{ width: 500, height: 500, top: -100, left: -100, background: '#7c3aed' }} />
      <div className="orb" style={{ width: 400, height: 400, top: '35%', right: -80, background: '#0ea5e9' }} />
      <div className="orb" style={{ width: 300, height: 300, bottom: '20%', left: '30%', background: '#06b6d4', opacity: 0.07 }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-20 pb-16 px-4 text-center hero-section-pad">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium mb-8"
               style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.3)', color:'#c4b5fd' }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            The most powerful GitHub README generator — free forever
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
          </div>

          {/* Heading */}
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 22 }}>
            Generate a{' '}
            <span className="gradient-text">Stunning GitHub</span>
            <br />README with <span className="gradient-warm">Readify</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Choose your profile type —{' '}
            <strong style={{ color: '#c4b5fd' }}>Student</strong>,{' '}
            <strong style={{ color: '#7dd3fc' }}>Professional</strong>, or{' '}
            <strong style={{ color: '#fcd34d' }}>Expert</strong> — and get a tailor-made README with live preview.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex items-center justify-center gap-4 flex-wrap">
            <Link href="/editor">
              <button className="btn btn-primary" style={{ padding: '13px 30px', fontSize: '15px', borderRadius: '12px' }}>
                <Zap size={17} /> Start Generating — Free
                <ChevronRight size={15} />
              </button>
            </Link>
            <a href="https://github.com/MathuR-A01" target="_blank" rel="noreferrer">
              <button className="btn btn-outline" style={{ padding: '13px 26px', fontSize: '14px', borderRadius: '12px' }}>
                ⭐ Star on GitHub
              </button>
            </a>
          </div>

          {/* Stats row */}
          <div className="stats-row flex items-center justify-center gap-8 mt-14 flex-wrap">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display gradient-text" style={{ fontSize: '1.7rem', fontWeight: 800 }}>{s.val}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-3)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profile Types ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display" style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: 8 }}>
              Templates Built For <span className="gradient-text">Your Career</span>
            </h2>
            <p style={{ color: 'var(--text-3)', fontSize: '14px' }}>Every type has its own form fields, sections, and README structure</p>
          </div>

          <div className="profiles-grid grid md:grid-cols-3 gap-6">
            {PROFILES.map(p => (
              <Link key={p.type} href="/editor" style={{ textDecoration: 'none' }}>
                <div
                  className="type-card h-full"
                  style={{ borderColor: p.borderColor }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${p.glow}`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                  <div className="text-4xl mb-3">{p.icon}</div>
                  <h3 className="font-display font-bold text-white mb-1.5" style={{ fontSize: '1.1rem' }}>{p.label}</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-3)', marginBottom: 14, lineHeight: 1.6 }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 mb-1.5" style={{ fontSize: '12.5px', color: 'var(--text-2)' }}>
                        <CheckCircle2 size={13} style={{ color: p.borderColor, flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: p.borderColor }}>
                    Use template <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-11">
            <h2 className="font-display" style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: 8 }}>
              Everything You Need to <span className="gradient-text">Stand Out</span>
            </h2>
            <p style={{ color: 'var(--text-3)', fontSize: '14px' }}>Built to make your GitHub profile genuinely unforgettable</p>
          </div>
          <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                     style={{ background: `${f.color}18`, color: f.color, border: `1px solid ${f.color}35` }}>
                  <f.icon size={19} />
                </div>
                <h3 className="font-semibold text-white mb-1.5" style={{ fontSize: '14px' }}>{f.title}</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-3)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="cta-banner card max-w-xl mx-auto p-12"
             style={{ borderColor: 'rgba(124,58,237,0.35)', boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
          <div className="text-5xl mb-4">⚡</div>
          <h2 className="font-display font-extrabold mb-3" style={{ fontSize: '1.8rem' }}>
            Ready to <span className="gradient-text">Level Up</span> Your Profile?
          </h2>
          <p style={{ color: 'var(--text-3)', marginBottom: 28, fontSize: '14px' }}>
            No sign-up. No credit card. No limits. Start in seconds.
          </p>
          <Link href="/editor">
            <button className="btn btn-primary" style={{ padding: '13px 34px', fontSize: '15px', borderRadius: '12px' }}>
              <Zap size={17} /> Launch the Generator <ChevronRight size={15} />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer relative z-10 py-7 px-4 text-center border-t" style={{ borderColor: 'rgba(99,102,241,0.1)' }}>
        <p style={{ color: 'var(--text-3)', fontSize: '12.5px' }}>
          Built with ❤️ for developers •{' '}
          <a href="https://github.com/MathuR-A01" target="_blank" rel="noreferrer" style={{ color: 'var(--violet)', textDecoration: 'none' }}>Open Source</a> • MIT License • Readify
        </p>
      </footer>
    </div>
  );
}
