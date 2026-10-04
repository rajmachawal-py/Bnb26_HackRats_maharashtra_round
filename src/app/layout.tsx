import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/lib/roleContext';
import { BrandProvider } from '@/lib/brandContext';
import { RoleSwitcher } from '@/components/common/RoleSwitcher';
import { DynamicLayout } from '@/components/layout/DynamicLayout';

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
          <BrandProvider>
            <DynamicLayout>{children}</DynamicLayout>
          </BrandProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
