import { NextRequest, NextResponse } from 'next/server';

const THEMES: Record<string, { bg: string; title: string; text: string; icon: string; border: string; rank: string }> = {
  tokyonight: { bg: '#1a1b26', title: '#70a5fd', text: '#a9b1d6', icon: '#b4f9f8', border: '#24283b', rank: '#38bdae' },
  dracula: { bg: '#282a36', title: '#ff79c6', text: '#f8f8f2', icon: '#8be9fd', border: '#44475a', rank: '#50fa7b' },
  gruvbox: { bg: '#282828', title: '#fabd2f', text: '#ebdbb2', icon: '#fe8019', border: '#3c3836', rank: '#b8bb26' },
  radical: { bg: '#141321', title: '#fe428e', text: '#a9fef7', icon: '#f8d230', border: '#241b2f', rank: '#f8d230' },
  merko: { bg: '#0a0f0d', title: '#abd200', text: '#868686', icon: '#b30000', border: '#1b2320', rank: '#abd200' },
  cobalt: { bg: '#193549', title: '#e683d9', text: '#ffffff', icon: '#04b6e2', border: '#152c3d', rank: '#04b6e2' },
  github_dark: { bg: '#0d1117', title: '#58a6ff', text: '#c9d1d9', icon: '#3fb950', border: '#30363d', rank: '#58a6ff' },
  nord: { bg: '#2e3440', title: '#81a1c1', text: '#d8dee9', icon: '#88c0d0', border: '#4c566a', rank: '#a3be8c' },
  onedark: { bg: '#282c34', title: '#61afef', text: '#abb2bf', icon: '#e5c07b', border: '#3e4451', rank: '#98c379' },
  default: { bg: '#fffefe', title: '#2f80ed', text: '#434d56', icon: '#4f76ec', border: '#e4e2e2', rank: '#2f80ed' },
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function calculateRank(stars: number, repos: number, followers: number): string {
  const score = stars * 4 + repos * 2 + followers * 3;
  if (score > 1000) return 'S+';
  if (score > 500) return 'S';
  if (score > 250) return 'A+';
  if (score > 100) return 'A';
  if (score > 40) return 'B+';
  return 'B';
}

function renderSvg(data: { name: string; username: string; stars: number; repos: number; followers: number; following: number; rank: string }, themeName: string, hideBorder: boolean): string {
  const theme = THEMES[themeName] || THEMES.tokyonight;
  const borderStroke = hideBorder ? 'none' : theme.border;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none">
    <style>
      .bg { fill: ${theme.bg}; stroke: ${borderStroke}; stroke-width: 1.5; rx: 12px; }
      .header { font: 700 18px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.title}; }
      .stat-label { font: 600 13px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; }
      .stat-value { font: 700 13px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; }
      .rank-circle-rim { stroke: ${theme.title}; fill: none; stroke-width: 5; opacity: 0.2; }
      .rank-circle { stroke: ${theme.rank}; fill: none; stroke-width: 5; stroke-linecap: round; opacity: 0.9; }
      .rank-text { font: 800 24px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.rank}; }
    </style>
    <rect width="495" height="195" class="bg" />

    <!-- Title -->
    <g transform="translate(25, 35)">
      <text x="0" y="0" class="header">${escapeXml(data.name || data.username)}'s GitHub Stats</text>
    </g>

    <!-- Rank Badge -->
    <g transform="translate(410, 100)">
      <circle class="rank-circle-rim" cx="0" cy="0" r="38" />
      <circle class="rank-circle" cx="0" cy="0" r="38" />
      <text x="0" y="8" text-anchor="middle" class="rank-text">${data.rank}</text>
    </g>

    <!-- Stats Stack -->
    <g transform="translate(25, 62)">
      <!-- Total Stars -->
      <g transform="translate(0, 0)">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" fill="${theme.icon}" />
        <text x="25" y="12" class="stat-label">Total Stars:</text>
        <text x="170" y="12" class="stat-value">${data.stars}</text>
      </g>

      <!-- Public Repos -->
      <g transform="translate(0, 26)">
        <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z" fill="${theme.icon}" />
        <text x="25" y="12" class="stat-label">Public Repositories:</text>
        <text x="170" y="12" class="stat-value">${data.repos}</text>
      </g>

      <!-- Followers -->
      <g transform="translate(0, 52)">
        <path d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM0 13a5 5 0 0110 0H0z" fill="${theme.icon}" />
        <text x="25" y="12" class="stat-label">Followers:</text>
        <text x="170" y="12" class="stat-value">${data.followers}</text>
      </g>

      <!-- Following -->
      <g transform="translate(0, 78)">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6z" fill="${theme.icon}" />
        <text x="25" y="12" class="stat-label">Following:</text>
        <text x="170" y="12" class="stat-value">${data.following}</text>
      </g>
    </g>
  </svg>`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawUsername = searchParams.get('username') || '';
  const username = rawUsername.replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/^@/, '').replace(/\/$/, '').split('/')[0].trim();
  const theme = searchParams.get('theme')?.toLowerCase() || 'tokyonight';
  const hideBorder = searchParams.get('hide_border') !== 'false';

  if (!username) {
    return new NextResponse('Username parameter required', { status: 400 });
  }

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Readify-Profile-Generator',
    };
    if (process.env.GITHUB_TOKEN || process.env.PAT_1) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN || process.env.PAT_1}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok) {
      // Fallback to external mirror if GitHub API is rate-limited on serverless IP
      const fallbackUrl = `https://github-readme-stats-eight-theta.vercel.app/api?username=${encodeURIComponent(username)}&theme=${theme}&hide_border=${hideBorder}`;
      return NextResponse.redirect(fallbackUrl);
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const totalStars = Array.isArray(repos) ? repos.reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count || 0), 0) : 0;
    const rank = calculateRank(totalStars, user.public_repos || 0, user.followers || 0);

    const svg = renderSvg({
      name: user.name || user.login,
      username: user.login,
      stars: totalStars,
      repos: user.public_repos || 0,
      followers: user.followers || 0,
      following: user.following || 0,
      rank,
    }, theme, hideBorder);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=14400, stale-while-revalidate=3600',
      },
    });
  } catch {
    // Redirect to resilient mirror on any error
    const fallbackUrl = `https://github-readme-stats-eight-theta.vercel.app/api?username=${encodeURIComponent(username)}&theme=${theme}&hide_border=${hideBorder}`;
    return NextResponse.redirect(fallbackUrl);
  }
}
