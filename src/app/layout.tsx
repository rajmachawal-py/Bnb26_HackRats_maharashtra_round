import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/lib/roleContext';
import { GlobalHeader } from '@/components/common/GlobalHeader';

export const metadata: Metadata = {
  title: 'CreatorFlow | Creator–Brand Collaboration Network',
  description: 'The shared operating layer connecting brands, creators, managers, and campaigns with verified contracts, AI brief compliance, and post-campaign growth history.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 antialiased selection:bg-violet-600 selection:text-white">
        <RoleProvider>
          {/* Universal Demo Switcher floating on top */}
          {/* Universal Demo Switcher floating on top */}

          {/* Sticky Global Navigation */}
          <GlobalHeader />

          {/* Main Viewport */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Minimalist Footer */}
          <footer className="border-t border-white/5 py-8 mt-16 bg-slate-950/60 backdrop-blur-md">
            <div className="page-container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-slate-400">CreatorFlow</span>
                <span>•</span>
                <span>BNB&apos;26 Hackathon Prototype</span>
                <span>•</span>
                <span className="text-emerald-400 font-mono">100% $0 Free Tier Stack</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span>YouTube Data API v3</span>
                <span>•</span>
                <span>MediaWiki REST</span>
                <span>•</span>
                <span>Twitch Helix</span>
                <span>•</span>
                <span>Gemini Flash AI</span>
              </div>
            </div>
          </footer>
        </RoleProvider>
      </body>
    </html>
  );
}
