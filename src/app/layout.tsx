import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/lib/roleContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RoleProvider>
          <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col pl-[260px]">
              <Topbar />
              <main className="flex-1 overflow-y-auto bg-slate-50">
                <div className="page-container py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <RoleSwitcher />
        </RoleProvider>
      </body>
    </html>
  );
}
