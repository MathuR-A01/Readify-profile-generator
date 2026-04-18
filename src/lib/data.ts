import { ProfileType } from '@/types';

// ─── Skill Badge Data ─────────────────────────────────────────────────────────
export const SKILLS_DATA = {
  languages: [
    'JavaScript','TypeScript','Python','Java','C++','C','Go','Rust',
    'PHP','Ruby','Kotlin','Swift','R','Scala','Dart','Elixir','Haskell',
  ],
  frontend: [
    'React','Next.js','Vue.js','Angular','Svelte','Tailwind CSS','Bootstrap',
    'Material UI','Remix','Astro','Nuxt.js','SolidJS','Qwik','HTMX',
  ],
  backend: [
    'Node.js','Express.js','Django','FastAPI','Flask','Laravel','Spring Boot',
    'NestJS','GraphQL','tRPC','Hono','Fiber','Gin','Echo',
  ],
  databases: [
    'MySQL','PostgreSQL','MongoDB','Redis','SQLite','Supabase','Firebase',
    'PlanetScale','Prisma','Drizzle','DynamoDB','Cassandra','InfluxDB',
  ],
  devops: [
    'Docker','Kubernetes','AWS','GCP','Azure','Vercel','Netlify',
    'Linux','GitHub Actions','Terraform','Nginx','Ansible','Pulumi','Cloudflare',
  ],
  mobile: [
    'Flutter','React Native','Swift','Kotlin','Expo','Ionic','Capacitor',
  ],
  aiml: [
    'TensorFlow','PyTorch','Scikit-learn','Hugging Face','LangChain',
    'OpenCV','Keras','Pandas','NumPy','NLTK','spaCy','Ollama',
  ],
  tools: [
    'Git','GitHub','VS Code','Figma','Postman','Jira','Notion',
    'Linux','Vim','Neovim','Obsidian','Slack','Docker','Webpack','Vite',
  ],
} as const;

export type SkillCategory = keyof typeof SKILLS_DATA;

// ─── Badge URL Generator ──────────────────────────────────────────────────────
const BADGE_OVERRIDES: Record<string, string> = {
  'JavaScript':    'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  'TypeScript':    'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white',
  'Python':         'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
  'Java':           'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white',
  'C++':            'https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white',
  'C':              'https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white',
  'Go':             'https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white',
  'Rust':           'https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white',
  'PHP':            'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',
  'Ruby':           'https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white',
  'Kotlin':         'https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=kotlin&logoColor=white',
  'Swift':          'https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white',
  'Dart':           'https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white',
  'React':          'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
  'Next.js':        'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white',
  'Vue.js':         'https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D',
  'Angular':        'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white',
  'Svelte':         'https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00',
  'Tailwind CSS':   'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white',
  'Bootstrap':      'https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white',
  'Node.js':        'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white',
  'Express.js':     'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white',
  'Django':         'https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white',
  'FastAPI':        'https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white',
  'Flask':          'https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white',
  'Laravel':        'https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white',
  'Spring Boot':    'https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white',
  'NestJS':         'https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white',
  'GraphQL':        'https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white',
  'MySQL':          'https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white',
  'PostgreSQL':     'https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white',
  'MongoDB':        'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white',
  'Redis':          'https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white',
  'SQLite':         'https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white',
  'Supabase':       'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white',
  'Firebase':       'https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white',
  'Docker':         'https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white',
  'Kubernetes':     'https://img.shields.io/badge/Kubernetes-326ce5?style=for-the-badge&logo=kubernetes&logoColor=white',
  'AWS':            'https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white',
  'GCP':            'https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white',
  'Azure':          'https://img.shields.io/badge/Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white',
  'Vercel':         'https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white',
  'Netlify':        'https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white',
  'Linux':          'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black',
  'Flutter':        'https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white',
  'React Native':   'https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
  'TensorFlow':     'https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white',
  'PyTorch':        'https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=PyTorch&logoColor=white',
  'Git':            'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  'GitHub':         'https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white',
  'VS Code':        'https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white',
  'Figma':          'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white',
  'Postman':        'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white',
};

export function getBadgeUrl(name: string): string {
  return BADGE_OVERRIDES[name] ?? `https://img.shields.io/badge/${encodeURIComponent(name)}-555555?style=for-the-badge`;
}

// ─── README Themes ────────────────────────────────────────────────────────────
export const README_THEMES = [
  { id: 'tokyonight',     name: 'Tokyo Night',      bg: '#1a1b2e', accent: '#7aa2f7' },
  { id: 'radical',        name: 'Radical',           bg: '#141321', accent: '#fe428e' },
  { id: 'merko',          name: 'Emerald Dark',      bg: '#0d1117', accent: '#0f5c32' },
  { id: 'gruvbox',        name: 'Gruvbox',           bg: '#282828', accent: '#b8bb26' },
  { id: 'cobalt',         name: 'Cobalt',            bg: '#193549', accent: '#e683d9' },
  { id: 'dracula',        name: 'Dracula',           bg: '#282a36', accent: '#ff79c6' },
  { id: 'github_dark',    name: 'GitHub Dark',       bg: '#0d1117', accent: '#58a6ff' },
  { id: 'nord',           name: 'Nord',              bg: '#2e3440', accent: '#81a1c1' },
  { id: 'onedark',        name: 'One Dark',          bg: '#282c34', accent: '#61afef' },
  { id: 'midnight_purple',name: 'Midnight Purple',   bg: '#080d27', accent: '#9f4fff' },
];

// ─── Profile Type Metadata ────────────────────────────────────────────────────
export const PROFILE_TYPE_META: Record<ProfileType, {
  label: string; icon: string; tagline: string;
  accent: string; glow: string;
  steps: string[];
}> = {
  student: {
    label: 'Student',
    icon: '🎓',
    tagline: 'CS students, bootcamp grads & fresh developers',
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    steps: ['Profile Type','Personal Info','About Me','Skills','GitHub Stats','Projects','Social Links','Extras','Theme'],
  },
  professional: {
    label: 'Professional',
    icon: '💼',
    tagline: 'Working developers, engineers & tech leads',
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.4)',
    steps: ['Profile Type','Personal Info','About Me','Skills','GitHub Stats','Projects','Social Links','Extras','Theme'],
  },
  expert: {
    label: 'Expert / OSS',
    icon: '🚀',
    tagline: 'Senior engineers, OSS contributors & speakers',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    steps: ['Profile Type','Personal Info','About Me','Skills','GitHub Stats','Projects','WakaTime','Social Links','Extras','Theme'],
  },
};

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  languages: '💻 Languages',
  frontend:  '🎨 Frontend',
  backend:   '⚙️ Backend',
  databases: '🗄️ Databases',
  devops:    '☁️ DevOps & Cloud',
  mobile:    '📱 Mobile',
  aiml:      '🤖 AI / ML',
  tools:     '🛠️ Tools',
};
