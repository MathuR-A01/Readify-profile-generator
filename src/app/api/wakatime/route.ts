import { NextRequest, NextResponse } from 'next/server';

// ─── Color palettes for premium themes ────────────────────────────────────────
const THEMES: Record<string, { bg: string; title: string; text: string; icon: string; border: string }> = {
  tokyonight: {
    bg: '#1a1b26',
    title: '#70a5fd',
    text: '#a9b1d6',
    icon: '#b4f9f8',
    border: '#24283b',
  },
  dracula: {
    bg: '#282a36',
    title: '#ff79c6',
    text: '#f8f8f2',
    icon: '#8be9fd',
    border: '#44475a',
  },
  gruvbox: {
    bg: '#282828',
    title: '#fabd2f',
    text: '#ebdbb2',
    icon: '#fe8019',
    border: '#3c3836',
  },
  radical: {
    bg: '#141321',
    title: '#fe428e',
    text: '#a9fef7',
    icon: '#f8d230',
    border: '#241b2f',
  },
  merko: {
    bg: '#0a0f0d',
    title: '#abd200',
    text: '#868686',
    icon: '#b30000',
    border: '#1b2320',
  },
  cobalt: {
    bg: '#193549',
    title: '#e683d9',
    text: '#ffffff',
    icon: '#04b6e2',
    border: '#152c3d',
  },
  default: {
    bg: '#fffefe',
    title: '#2f80ed',
    text: '#434d56',
    icon: '#4f76ec',
    border: '#e4e2e2',
  },
};

// ─── Standard color mappings for languages ────────────────────────────────────
const LANGUAGE_COLORS: Record<string, string> = {
  'Blade Template': '#f7523f',
  'PHP': '#4f5d95',
  'TypeScript': '#3178c6',
  'JavaScript': '#f1e05a',
  'JSON': '#29beb0',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Python': '#3572a5',
  'Vue': '#41b883',
  'React': '#61dafb',
  'Svelte': '#ff3e00',
  'Go': '#00add8',
  'Rust': '#dea584',
  'C++': '#f34b7d',
  'Java': '#b07219',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'Swift': '#F05138',
  'Ruby': '#701516',
  'C#': '#178600',
  'Shell': '#89e051',
  'YAML': '#cb171e',
  'Markdown': '#083fa1',
  'Other': '#8b949e',
};

// Generate stable HSL color from language name if not standard
function getLanguageColor(name: string): string {
  if (LANGUAGE_COLORS[name]) return LANGUAGE_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  const s = 70 + (Math.abs(hash >> 8) % 15); // 70% - 85% saturation
  const l = 50 + (Math.abs(hash >> 16) % 10); // 50% - 60% lightness
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// ─── Interfaces for WakaTime Data ─────────────────────────────────────────────
interface WakaLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
}

interface WakaStats {
  username: string;
  human_readable_range: string;
  total_seconds: number;
  human_readable_total: string;
  languages: WakaLanguage[];
}

// Helper: Escape XML string special chars
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

// ─── SVG Renderer Functions ───────────────────────────────────────────────────

function renderErrorSvg(username: string, errorMsg: string, themeName: string): string {
  const theme = THEMES[themeName] || THEMES.default;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="490" height="180" viewBox="0 0 490 180" fill="none">
    <style>
      .bg { fill: ${theme.bg}; stroke: ${theme.border}; stroke-width: 1.5; rx: 12px; }
      .title { font: bold 16px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.title}; }
      .error-msg { font: 500 13px 'Segoe UI', Inter, Roboto, sans-serif; fill: #f87171; }
      .help-text { font: 400 11.5px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; opacity: 0.85; }
    </style>
    <rect width="490" height="180" class="bg" />
    
    <!-- Warning Icon -->
    <g transform="translate(25, 25)">
      <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#f87171" transform="scale(1.2)" />
      <text x="35" y="19" class="title">WakaTime Stats Error</text>
    </g>

    <text x="25" y="80" class="error-msg">${escapeXml(errorMsg)}</text>

    <g transform="translate(25, 105)">
      <text x="0" y="0" class="help-text">1. Check that username &quot;${escapeXml(username)}&quot; is correct.</text>
      <text x="0" y="20" class="help-text">2. Ensure stats are set to Public in WakaTime Settings:</text>
      <text x="15" y="38" class="help-text" font-weight="bold" fill="${theme.icon}">Account Settings → Languages &amp; Editors Publicly → Public</text>
    </g>
  </svg>`;
}

function renderCompactSvg(stats: WakaStats, themeName: string, maxLangs: number, hideBorder: boolean): string {
  const theme = THEMES[themeName] || THEMES.default;
  const langs = stats.languages.slice(0, maxLangs);
  
  // Total percent of languages showing
  const displayedPercent = langs.reduce((acc, curr) => acc + curr.percent, 0);
  
  // Adjust height based on number of languages
  const gridRows = Math.ceil(langs.length / 2);
  const cardHeight = 90 + gridRows * 24 + 20;

  // Segmented bar rendering
  let currentOffset = 0;
  const barWidth = 440;
  const barHeight = 12;
  const barY = 62;
  
  const barSegments = langs.map((lang, idx) => {
    // scale to fill displayed bar
    const segmentWidth = (lang.percent / (displayedPercent || 100)) * barWidth;
    const color = getLanguageColor(lang.name);
    
    // Draw rect segments. Rounded corners on outer edges
    const isFirst = idx === 0;
    const isLast = idx === langs.length - 1;
    const rLeft = isFirst ? 6 : 0;
    const rRight = isLast ? 6 : 0;

    const rect = `<rect x="${25 + currentOffset}" y="${barY}" width="${segmentWidth}" height="${barHeight}" fill="${color}" />`;
    currentOffset += segmentWidth;
    return rect;
  }).join('\n');

  // Multi-color progress bar with rounded ends using a mask
  const progressBarMask = `<mask id="bar-mask">
    <rect x="25" y="${barY}" width="${barWidth}" height="${barHeight}" rx="6" fill="white" />
  </mask>`;

  // Render language grid (2 columns)
  const gridItems = langs.map((lang, idx) => {
    const colIdx = idx % 2;
    const rowIdx = Math.floor(idx / 2);
    const x = colIdx === 0 ? 25 : 245;
    const y = 98 + rowIdx * 24;
    const color = getLanguageColor(lang.name);

    return `<g transform="translate(${x}, ${y})">
      <circle cx="5" cy="5" r="5" fill="${color}" />
      <text x="18" y="9" class="lang-text">${escapeXml(lang.name)}</text>
      <text x="140" y="9" class="lang-stats">${escapeXml(lang.text)} <tspan opacity="0.65">(${lang.percent.toFixed(1)}%)</tspan></text>
    </g>`;
  }).join('\n');

  const borderStroke = hideBorder ? 'none' : theme.border;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="490" height="${cardHeight}" viewBox="0 0 490 ${cardHeight}" fill="none">
    <style>
      .bg { fill: ${theme.bg}; stroke: ${borderStroke}; stroke-width: 1.5; rx: 12px; }
      .title { font: bold 16px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.title}; }
      .subtitle { font: 500 11px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; opacity: 0.6; }
      .lang-text { font: bold 12px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; }
      .lang-stats { font: 400 11.5px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; opacity: 0.85; }
    </style>
    <rect width="490" height="${cardHeight}" class="bg" />

    <!-- Header -->
    <g transform="translate(25, 22)">
      <!-- Clock Icon -->
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="${theme.icon}" />
      <text x="32" y="17" class="title">Coding Activity</text>
      <text x="440" y="16" text-anchor="end" class="subtitle">${escapeXml(stats.human_readable_range)}</text>
    </g>

    <!-- Segments mask & elements -->
    ${progressBarMask}
    <g mask="url(#bar-mask)">
      ${barSegments}
    </g>

    <!-- Coding details -->
    ${gridItems}
  </svg>`;
}

function renderDefaultSvg(stats: WakaStats, themeName: string, maxLangs: number, hideBorder: boolean): string {
  const theme = THEMES[themeName] || THEMES.default;
  const langs = stats.languages.slice(0, maxLangs);
  
  const cardHeight = 75 + langs.length * 40;
  const borderStroke = hideBorder ? 'none' : theme.border;

  const progressBars = langs.map((lang, idx) => {
    const y = 58 + idx * 40;
    const color = getLanguageColor(lang.name);
    const barWidth = 440;
    const filledWidth = (lang.percent / 100) * barWidth;

    return `<g transform="translate(25, ${y})">
      <!-- Lang Label -->
      <text x="0" y="10" class="lang-text">${escapeXml(lang.name)}</text>
      <!-- Stats text -->
      <text x="440" y="10" text-anchor="end" class="lang-stats">${escapeXml(lang.text)} <tspan opacity="0.65">(${lang.percent.toFixed(1)}%)</tspan></text>
      
      <!-- Progress Bar Track -->
      <rect x="0" y="18" width="${barWidth}" height="8" rx="4" fill="${theme.text}" opacity="0.1" />
      <!-- Progress Bar Fill -->
      <rect x="0" y="18" width="${filledWidth}" height="8" rx="4" fill="${color}" />
    </g>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="490" height="${cardHeight}" viewBox="0 0 490 ${cardHeight}" fill="none">
    <style>
      .bg { fill: ${theme.bg}; stroke: ${borderStroke}; stroke-width: 1.5; rx: 12px; }
      .title { font: bold 16px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.title}; }
      .subtitle { font: 500 11px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; opacity: 0.6; }
      .lang-text { font: bold 12px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; }
      .lang-stats { font: 400 11.5px 'Segoe UI', Inter, Roboto, sans-serif; fill: ${theme.text}; opacity: 0.85; }
    </style>
    <rect width="490" height="${cardHeight}" class="bg" />

    <!-- Header -->
    <g transform="translate(25, 22)">
      <!-- Clock Icon -->
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="${theme.icon}" />
      <text x="32" y="17" class="title">Coding Activity</text>
      <text x="440" y="16" text-anchor="end" class="subtitle">${escapeXml(stats.human_readable_range)}</text>
    </g>

    <!-- Progress Stack -->
    ${progressBars}
  </svg>`;
}

// ─── Main Route GET Handler ───────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username')?.trim() || '';
  const theme = searchParams.get('theme')?.toLowerCase() || 'tokyonight';
  const layout = searchParams.get('layout')?.toLowerCase() || 'compact';
  const hideBorder = searchParams.get('hide_border') !== 'false';
  const requestedRange = searchParams.get('range')?.toLowerCase() || 'last_7_days';
  
  const langsCountStr = searchParams.get('langs_count') || '5';
  const langsCount = Math.max(1, Math.min(20, parseInt(langsCountStr, 10) || 5));

  // Response helper with appropriate SVG and Cache-Control headers
  const makeSvgResponse = (svg: string, isError: boolean = false) => {
    const cacheControl = isError 
      ? 'no-cache, no-store, must-revalidate' 
      : 'public, max-age=14400, stale-while-revalidate=3600'; // 4 hours public cache
      
    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': cacheControl,
      },
    });
  };

  if (!username) {
    return makeSvgResponse(renderErrorSvg('', 'Username parameter is required', theme), true);
  }

  // Fallback ranges in order of standard availability
  const rangesToTry = [
    requestedRange,
    'all_time',
    'last_7_days',
    'last_30_days',
    'last_6_months',
    'last_year',
  ].filter((value, idx, self) => self.indexOf(value) === idx);

  let fetchError = 'No data fetched';
  let fetchedData: any = null;

  // Attempt requests sequentially through the range fallbacks to solve the public stats range restriction bug!
  for (const rangeToFetch of rangesToTry) {
    try {
      const url = `https://wakatime.com/api/v1/users/${encodeURIComponent(username)}/stats/${rangeToFetch}`;
      
      // Setup fetch with timeout to avoid blocking Vercel serverless function
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 6000); // 6s timeout
      
      const res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 14400 }, // 4 hour cache for fetch inside next
      });
      
      clearTimeout(id);

      if (!res.ok) {
        if (res.status === 404) {
          fetchError = 'WakaTime user not found. Is your username correct?';
          continue; // Try next range or break
        }
        fetchError = `WakaTime API returned status code ${res.status}`;
        continue;
      }

      const body = await res.json();
      
      if (body.error) {
        fetchError = body.error;
        // If it is a range-matching error, try the next range (e.g. falling back to all_time)
        if (body.error.toLowerCase().includes('time range')) {
          continue;
        }
        break; // If other error, break and show it
      }

      if (body.data) {
        fetchedData = body.data;
        break; // Success!
      }
    } catch (e: any) {
      fetchError = e?.message || 'Network request failed';
      // Proceed to try next range
    }
  }

  // If all attempts failed or returned no data, render error card
  if (!fetchedData) {
    return makeSvgResponse(renderErrorSvg(username, fetchError, theme), true);
  }

  // Parse WakaTime response into WakaStats model
  const wakaStats: WakaStats = {
    username: fetchedData.username || username,
    human_readable_range: fetchedData.human_readable_range || requestedRange,
    total_seconds: fetchedData.total_seconds || 0,
    human_readable_total: fetchedData.human_readable_total || '0 hrs 0 mins',
    languages: (fetchedData.languages || []).map((lang: any) => ({
      name: lang.name || 'Unknown',
      total_seconds: lang.total_seconds || 0,
      percent: lang.percent || 0,
      digital: lang.digital || '0:00',
      decimal: lang.decimal || '0.00',
      text: lang.text || '0 mins',
      hours: lang.hours || 0,
      minutes: lang.minutes || 0,
    })),
  };

  // Render requested layout
  let svgContent = '';
  if (layout === 'compact') {
    svgContent = renderCompactSvg(wakaStats, theme, langsCount, hideBorder);
  } else {
    svgContent = renderDefaultSvg(wakaStats, theme, langsCount, hideBorder);
  }

  return makeSvgResponse(svgContent, false);
}
