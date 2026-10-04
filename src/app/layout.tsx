import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/lib/roleContext';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';

export const metadata: Metadata = {
  title: 'CreatorFlow | Creator–Brand Collaboration Network',
  description: 'A professional B2B SaaS for creator discovery and campaign management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}
