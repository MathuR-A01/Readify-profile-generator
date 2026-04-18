import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Editor — Readify',
  description: 'Generate your GitHub README with our live split-screen editor.',
};
export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
