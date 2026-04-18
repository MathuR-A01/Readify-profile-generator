import { ProfileState, SocialLinks } from '@/types';
import { getBadgeUrl } from './data';

// ─── Helper: clean GitHub username (strips URL, spaces, invalid chars) ────────
function cleanUsername(raw: string): string {
  const cleaned = (raw || '')
    .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    .replace(/\/$/, '')
    .split('/')[0]
    .replace(/[^a-zA-Z0-9-]/g, '')   // remove spaces & special chars
    .replace(/^-+|-+$/g, '')          // strip leading/trailing hyphens
    .trim();
  return cleaned || 'yourusername';
}

// ─── Social badge definitions ─────────────────────────────────────────────────
const SOCIAL_BADGES: Array<{ key: keyof SocialLinks; label: string; color: string; logo: string }> = [
  { key: 'linkedin',  label: 'LinkedIn',  color: '0077B5', logo: 'linkedin' },
  { key: 'twitter',   label: 'Twitter',   color: '1DA1F2', logo: 'twitter' },
  { key: 'github',    label: 'GitHub',    color: '100000', logo: 'github' },
  { key: 'instagram', label: 'Instagram', color: 'E4405F', logo: 'instagram' },
  { key: 'youtube',   label: 'YouTube',   color: 'FF0000', logo: 'youtube' },
  { key: 'devto',     label: 'Dev.to',    color: '0A0A0A', logo: 'devdotto' },
  { key: 'medium',    label: 'Medium',    color: '12100E', logo: 'medium' },
  { key: 'hashnode',  label: 'Hashnode',  color: '2962FF', logo: 'hashnode' },
];

// ─── Main generator ───────────────────────────────────────────────────────────
export function generateMarkdown(s: ProfileState): string {
  const { personal, about, skills, githubStats, projects, social, extras, wakatime, readmeTheme, profileType } = s;

  const u  = cleanUsername(personal.githubUsername);
  const em = (emoji: string, label: string) => extras.showEmojiHeaders ? `${emoji} ${label}` : label;

  let md = '';

  /* ── Wave header ─────────────────────────────────────────────────────────── */
  if (extras.showWave && personal.fullName) {
    md += `<div align="center">\n`;
    md += `<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=${encodeURIComponent(personal.fullName)}&fontSize=40&fontColor=fff&animation=twinkling&fontAlignY=32&desc=${encodeURIComponent(personal.tagline)}&descAlignY=55&descAlign=50" width="100%" />\n`;
    md += `</div>\n\n`;
  }

  /* ── Typing SVG ──────────────────────────────────────────────────────────── */
  if (extras.typingTexts.trim()) {
    const lines = extras.typingTexts.split(',').map(l => l.trim()).filter(Boolean).join(';');
    md += `<div align="center">\n`;
    md += `<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=58A6FF&center=true&vCenter=true&width=600&lines=${encodeURIComponent(lines)}" alt="Typing SVG" />\n`;
    md += `</div>\n\n`;
  }

  if (extras.showDividers) md += `---\n\n`;

  /* ── About Me — HTML table renders each row vertically ───────────────────── */
  md += `## ${em('👨‍💻', 'About Me')}\n\n`;

  const infoRows: string[] = [];

  if (profileType === 'student') {
    if (about.university?.trim())     infoRows.push(`<tr><td>🎓 <strong>University</strong></td><td>${about.university.trim()}</td></tr>`);
    if (about.major?.trim())          infoRows.push(`<tr><td>📚 <strong>Major</strong></td><td>${about.major.trim()}</td></tr>`);
    if (about.graduationYear?.trim()) infoRows.push(`<tr><td>🗓️ <strong>Graduating</strong></td><td>${about.graduationYear.trim()}</td></tr>`);
  } else if (profileType === 'professional') {
    const role = [about.jobTitle?.trim(), about.company?.trim()].filter(Boolean).join(' @ ');
    if (role)                            infoRows.push(`<tr><td>💼 <strong>Role</strong></td><td>${role}</td></tr>`);
    if (about.yearsOfExperience?.trim()) infoRows.push(`<tr><td>⏱️ <strong>Experience</strong></td><td>${about.yearsOfExperience.trim()}</td></tr>`);
  } else if (profileType === 'expert') {
    if (about.specialization?.trim())     infoRows.push(`<tr><td>🔬 <strong>Specialization</strong></td><td>${about.specialization.trim()}</td></tr>`);
    if (about.openSourceContribs?.trim()) infoRows.push(`<tr><td>🌍 <strong>Open Source</strong></td><td>${about.openSourceContribs.trim()}</td></tr>`);
    if (about.mentoring?.trim())          infoRows.push(`<tr><td>🧠 <strong>Mentoring</strong></td><td>${about.mentoring.trim()}</td></tr>`);
    if (about.speaking?.trim())           infoRows.push(`<tr><td>🎤 <strong>Speaking</strong></td><td>${about.speaking.trim()}</td></tr>`);
  }

  if (personal.location?.trim())     infoRows.push(`<tr><td>📍 <strong>Location</strong></td><td>${personal.location.trim()}</td></tr>`);
  if (personal.portfolioUrl?.trim()) infoRows.push(`<tr><td>🌐 <strong>Portfolio</strong></td><td><a href="${personal.portfolioUrl.trim()}">${personal.portfolioUrl.trim()}</a></td></tr>`);
  if (personal.email?.trim())        infoRows.push(`<tr><td>📫 <strong>Email</strong></td><td>${personal.email.trim()}</td></tr>`);
  if (personal.pronouns?.trim())     infoRows.push(`<tr><td>😄 <strong>Pronouns</strong></td><td>${personal.pronouns.trim()}</td></tr>`);

  if (infoRows.length > 0) {
    md += `<table>\n`;
    infoRows.forEach(row => { md += `  ${row}\n`; });
    md += `</table>\n\n`;
  }

  // Bio — preserve paragraph breaks (split on double newlines)
  if (about.bio?.trim()) {
    about.bio.split(/\n{2,}/).map(p => p.trim()).filter(Boolean).forEach(p => {
      md += `${p}\n\n`;
    });
  }

  // Activity bullets
  const bullets = [
    about.workingOn?.trim()     && `🔭 I'm currently working on **${about.workingOn.trim()}**`,
    about.learning?.trim()      && `🌱 I'm currently learning **${about.learning.trim()}**`,
    about.collaborateOn?.trim() && `👯 I'm looking to collaborate on **${about.collaborateOn.trim()}**`,
    about.askMeAbout?.trim()    && `💬 Ask me about **${about.askMeAbout.trim()}**`,
    about.funFact?.trim()       && `⚡ Fun fact: ${about.funFact.trim()}`,
  ].filter(Boolean) as string[];

  if (bullets.length) { bullets.forEach(b => { md += `- ${b}\n`; }); md += `\n`; }
  if (extras.showDividers) md += `---\n\n`;

  /* ── Tech Stack — 2-column HTML table ────────────────────────────────────── */
  const cats: Array<[keyof typeof skills, string]> = [
    ['languages', '💻 Languages'],
    ['frontend',  '🎨 Frontend'],
    ['backend',   '⚙️ Backend'],
    ['databases', '🗄️ Databases'],
    ['devops',    '☁️ DevOps & Cloud'],
    ['mobile',    '📱 Mobile'],
    ['aiml',      '🤖 AI / ML'],
    ['tools',     '🛠️ Tools'],
  ];
  const hasSkills = cats.some(([k]) => skills[k].length > 0);

  if (hasSkills) {
    md += `## ${em('🛠️', 'Tech Stack')}\n\n`;
    md += `<table>\n`;
    cats.forEach(([key, label]) => {
      if (skills[key].length > 0) {
        const badges = skills[key]
          .map(n => `<img src="${getBadgeUrl(n)}" alt="${n}" height="28" />`)
          .join(' ');
        md += `  <tr>\n`;
        md += `    <td align="left" valign="top" width="150"><strong>${label}</strong></td>\n`;
        md += `    <td valign="middle">${badges}</td>\n`;
        md += `  </tr>\n`;
      }
    });
    md += `</table>\n\n`;
    if (extras.showDividers) md += `---\n\n`;
  }

  /* ── GitHub Stats ────────────────────────────────────────────────────────── */
  if (githubStats.showStats || githubStats.showLanguages || githubStats.showStreak ||
      githubStats.showTrophies || githubStats.showActivityGraph || githubStats.showViews) {
    md += `## ${em('📊', 'GitHub Analytics')}\n\n`;

    if (githubStats.showViews) {
      md += `<img src="https://komarev.com/ghpvc/?username=${u}&color=blueviolet&style=flat-square&label=Profile+Views" alt="Profile Views" />\n\n`;
    }

    if (githubStats.showStats || githubStats.showLanguages) {
      md += `<p align="center">\n`;
      if (githubStats.showStats) {
        md += `  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${readmeTheme}&include_all_commits=true&count_private=true&hide_border=true" alt="GitHub Stats" />\n`;
      }
      if (githubStats.showLanguages) {
        md += `  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=${githubStats.statsLayout}&langs_count=8&theme=${readmeTheme}&hide_border=true" alt="Top Languages" />\n`;
      }
      md += `</p>\n\n`;
    }

    if (githubStats.showStreak) {
      md += `<p align="center">\n  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=${readmeTheme}&hide_border=true" alt="GitHub Streak" />\n</p>\n\n`;
    }
    if (githubStats.showTrophies) {
      md += `<p align="center">\n  <img src="https://github-profile-trophy.vercel.app/?username=${u}&theme=${readmeTheme}&no-frame=true&row=1&column=7" alt="Trophies" />\n</p>\n\n`;
    }
    if (githubStats.showActivityGraph) {
      // Use WakaTime coding graph if chosen AND username is provided, else default to GitHub graph
      const useWaka = githubStats.activityGraphSource === 'wakatime' && wakatime.username?.trim();
      if (useWaka) {
        md += `<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${wakatime.username!.trim()}&theme=${readmeTheme}&hide_border=true&layout=compact&langs_count=10" alt="WakaTime Coding Activity" />\n</p>\n\n`;
      } else {
        md += `<p align="center">\n  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${u}&theme=${readmeTheme}&hide_border=true&area=true" alt="GitHub Activity Graph" />\n</p>\n\n`;
      }
    }
    if (extras.showDividers) md += `---\n\n`;
  }

  /* ── Projects ────────────────────────────────────────────────────────────── */
  if (projects.length) {
    md += `## ${em('🚀', 'Featured Projects')}\n\n`;
    projects.forEach(p => {
      if (!p.name.trim()) return;
      md += `### 📌 [${p.name}](${p.repoUrl || '#'})\n\n`;
      if (p.description) md += `> ${p.description}\n\n`;
      if (p.tech)        md += `**Built with:** \`${p.tech}\`\n\n`;
      if (p.demoUrl)     md += `<a href="${p.demoUrl}"><img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge" alt="Live Demo" /></a>\n\n`;
    });
    if (extras.showDividers) md += `---\n\n`;
  }

  /* ── WakaTime ────────────────────────────────────────────────────────────── */
  if (wakatime.username?.trim() && wakatime.showCard) {
    md += `## ${em('⏱️', 'Coding Activity')}\n\n`;
    md += `<p align="center">\n`;
    md += `  <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${wakatime.username.trim()}&theme=${wakatime.cardTheme}&layout=${wakatime.layoutStyle}&hide_border=true" alt="WakaTime Stats" />\n`;
    md += `</p>\n\n`;
    if (wakatime.enableAction) md += `<!--START_SECTION:waka-->\n<!--END_SECTION:waka-->\n\n`;
    if (extras.showDividers) md += `---\n\n`;
  }

  /* ── Social Links — HTML badges ──────────────────────────────────────────── */
  const activeSocials = SOCIAL_BADGES.filter(s => social[s.key]?.trim());
  if (activeSocials.length) {
    md += `## ${em('🌐', 'Connect With Me')}\n\n`;
    md += `<p align="center">\n`;
    activeSocials.forEach(({ key, label, color, logo }) => {
      const url   = social[key]!.trim();
      const badge = `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
      md += `  <a href="${url}" target="_blank"><img src="${badge}" alt="${label}" /></a>\n`;
    });
    md += `</p>\n\n`;
    if (extras.showDividers) md += `---\n\n`;
  }

  /* ── Support / Hire ──────────────────────────────────────────────────────── */
  if (extras.buyMeCoffeeUrl?.trim() || extras.hireMeEmail?.trim()) {
    md += `## ${em('☕', 'Support & Hire')}\n\n`;
    if (extras.buyMeCoffeeUrl?.trim()) {
      md += `<a href="${extras.buyMeCoffeeUrl.trim()}"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" /></a>\n`;
    }
    if (extras.hireMeEmail?.trim()) {
      md += `<a href="mailto:${extras.hireMeEmail.trim()}"><img src="https://img.shields.io/badge/Hire_Me-Email-brightgreen?style=for-the-badge&logo=gmail&logoColor=white" alt="Hire Me" /></a>\n`;
    }
    md += `\n`;
    if (extras.showDividers) md += `---\n\n`;
  }

  /* ── Footer wave ─────────────────────────────────────────────────────────── */
  if (extras.showWave) {
    md += `<div align="center">\n`;
    md += `<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%" />\n`;
    md += `</div>\n`;
  }


  return md;
}
