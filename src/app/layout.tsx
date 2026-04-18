import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

const BASE_URL = 'https://readify-generator.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Readify — GitHub README Profile Generator',
    template: '%s | Readify',
  },
  description:
    'Generate a stunning, professional GitHub README profile in minutes. Student, Professional, or Expert templates with live preview, 200+ skill badges, GitHub stats, WakaTime integration & 10+ themes.',
  keywords: [
    'GitHub README generator', 'profile README generator', 'GitHub profile',
    'README template', 'Readify', 'WakaTime README', 'GitHub stats card',
    'skill badges', 'developer profile',
  ],
  authors: [{ name: 'Readify', url: BASE_URL }],
  creator: 'Readify',
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Readify',
    title: 'Readify — GitHub README Profile Generator',
    description:
      'Generate a stunning, professional GitHub README profile in minutes — free forever.',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Readify' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Readify — GitHub README Profile Generator',
    description: 'Free GitHub README generator with live preview, skill badges & WakaTime.',
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
