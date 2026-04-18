// ─── Profile Types ────────────────────────────────────────────────────────────
export type ProfileType = 'student' | 'professional' | 'expert';

// ─── Form Section Interfaces ──────────────────────────────────────────────────
export interface PersonalInfo {
  fullName: string;
  githubUsername: string;
  tagline: string;
  photoUrl: string;
  location: string;
  email: string;
  portfolioUrl: string;
  pronouns: string;
}

export interface AboutMe {
  bio: string;
  workingOn: string;
  learning: string;
  collaborateOn: string;
  askMeAbout: string;
  funFact: string;
  // Student-specific
  university: string;
  major: string;
  graduationYear: string;
  // Professional-specific
  jobTitle: string;
  company: string;
  yearsOfExperience: string;
  // Expert-specific
  specialization: string;
  openSourceContribs: string;
  mentoring: string;
  speaking: string;
}

export interface TechSkills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  mobile: string[];
  aiml: string[];
  tools: string[];
}

export interface GitHubStats {
  showStats: boolean;
  showLanguages: boolean;
  showStreak: boolean;
  showTrophies: boolean;
  showActivityGraph: boolean;
  activityGraphSource: 'github' | 'wakatime'; // which graph to embed
  showViews: boolean;
  statsTheme: string;
  statsLayout: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string;
  repoUrl: string;
  demoUrl: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  youtube: string;
  devto: string;
  hashnode: string;
  medium: string;
  discord: string;
  telegram: string;
}

export interface Extras {
  typingTexts: string;
  buyMeCoffeeUrl: string;
  hireMeEmail: string;
  showWave: boolean;
  showDividers: boolean;
  showEmojiHeaders: boolean;
}

export interface WakaTimeConfig {
  username: string;
  showCard: boolean;
  statsRange: string;
  cardTheme: string;
  compactLayout: boolean;
  layoutStyle: string;
  enableAction: boolean;
  showDailyTime: boolean;
  showLanguages: boolean;
  showEditors: boolean;
  showProjects: boolean;
  timeFormat: string;
}

// ─── Full Store Interface ─────────────────────────────────────────────────────
export interface ProfileState {
  profileType: ProfileType;
  currentStep: number;
  personal: PersonalInfo;
  about: AboutMe;
  skills: TechSkills;
  githubStats: GitHubStats;
  projects: Project[];
  social: SocialLinks;
  extras: Extras;
  wakatime: WakaTimeConfig;
  readmeTheme: string;
}

export interface ProfileActions {
  setProfileType: (t: ProfileType) => void;
  setCurrentStep: (s: number) => void;
  setPersonal: (d: Partial<PersonalInfo>) => void;
  setAbout: (d: Partial<AboutMe>) => void;
  setSkills: (d: Partial<TechSkills>) => void;
  setGithubStats: (d: Partial<GitHubStats>) => void;
  setProjects: (p: Project[]) => void;
  setSocial: (d: Partial<SocialLinks>) => void;
  setExtras: (d: Partial<Extras>) => void;
  setWakaTime: (d: Partial<WakaTimeConfig>) => void;
  setReadmeTheme: (t: string) => void;
}

export type ProfileStore = ProfileState & ProfileActions;
