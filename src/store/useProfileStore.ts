import { create } from 'zustand';
import {
  ProfileStore, ProfileType, PersonalInfo, AboutMe,
  TechSkills, GitHubStats, Project, SocialLinks, Extras, WakaTimeConfig
} from '@/types';

const defaultPersonal: PersonalInfo = {
  fullName: '', githubUsername: '', tagline: '',
  photoUrl: '', location: '', email: '', portfolioUrl: '', pronouns: '',
};

const defaultAbout: AboutMe = {
  bio: '', workingOn: '', learning: '', collaborateOn: '', askMeAbout: '', funFact: '',
  university: '', major: '', graduationYear: '',
  jobTitle: '', company: '', yearsOfExperience: '',
  specialization: '', openSourceContribs: '', mentoring: '', speaking: '',
};

const defaultSkills: TechSkills = {
  languages: [], frontend: [], backend: [], databases: [],
  devops: [], mobile: [], aiml: [], tools: [],
};

const defaultGithubStats: GitHubStats = {
  showStats: true, showLanguages: true, showStreak: true,
  showTrophies: false, showActivityGraph: false,
  activityGraphSource: 'github',
  showViews: true,
  statsTheme: 'tokyonight', statsLayout: 'compact',
};

const defaultSocial: SocialLinks = {
  github: '', linkedin: '', twitter: '', instagram: '',
  youtube: '', devto: '', hashnode: '', medium: '', discord: '', telegram: '',
};

const defaultExtras: Extras = {
  typingTexts: '', buyMeCoffeeUrl: '', hireMeEmail: '',
  showWave: true, showDividers: true, showEmojiHeaders: true,
};

const defaultWakaTime: WakaTimeConfig = {
  username: '', showCard: false, statsRange: 'last_7_days',
  cardTheme: 'tokyonight', compactLayout: true, layoutStyle: 'compact',
  enableAction: false, showDailyTime: true, showLanguages: true,
  showEditors: true, showProjects: true, timeFormat: 'digital',
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profileType: 'student',
  currentStep: 0,
  isFinished: false,
  personal: defaultPersonal,
  about: defaultAbout,
  skills: defaultSkills,
  githubStats: defaultGithubStats,
  projects: [],
  social: defaultSocial,
  extras: defaultExtras,
  wakatime: defaultWakaTime,
  readmeTheme: 'tokyonight',

  setProfileType: (t: ProfileType) => set({ profileType: t }),
  setCurrentStep: (s: number) => set({ currentStep: s }),
  setIsFinished: (v: boolean) => set({ isFinished: v }),
  setPersonal: (d: Partial<PersonalInfo>) => set((st) => ({ personal: { ...st.personal, ...d } })),
  setAbout: (d: Partial<AboutMe>) => set((st) => ({ about: { ...st.about, ...d } })),
  setSkills: (d: Partial<TechSkills>) => set((st) => ({ skills: { ...st.skills, ...d } })),
  setGithubStats: (d: Partial<GitHubStats>) => set((st) => ({ githubStats: { ...st.githubStats, ...d } })),
  setProjects: (p: Project[]) => set({ projects: p }),
  setSocial: (d: Partial<SocialLinks>) => set((st) => ({ social: { ...st.social, ...d } })),
  setExtras: (d: Partial<Extras>) => set((st) => ({ extras: { ...st.extras, ...d } })),
  setWakaTime: (d: Partial<WakaTimeConfig>) => set((st) => ({ wakatime: { ...st.wakatime, ...d } })),
  setReadmeTheme: (t: string) => set({ readmeTheme: t }),

  resetStore: () => set({
    currentStep: 0,
    isFinished: false,
    personal: defaultPersonal,
    about: defaultAbout,
    skills: defaultSkills,
    githubStats: defaultGithubStats,
    projects: [],
    social: defaultSocial,
    extras: defaultExtras,
    wakatime: defaultWakaTime,
    readmeTheme: 'tokyonight',
  }),
}));
