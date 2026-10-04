'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Layers, 
  LayoutDashboard, 
  Video, 
  Briefcase, 
  CreditCard,
  Settings,
  HelpCircle,
  Inbox
} from 'lucide-react';

export function CreatorSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/creator/dashboard', icon: LayoutDashboard },
    { label: 'My Media Kit', href: '/creator/media-kit', icon: Video },
    { label: 'Incoming Offers', href: '/creator/offers', icon: Inbox },
    { label: 'Tasks & Deliverables', href: '/creator/tasks', icon: Briefcase },
    { label: 'Earnings & Escrow', href: '/creator/earnings', icon: CreditCard },
  ];

  return (
    <aside className="w-[260px] bg-slate-900 h-screen fixed left-0 top-0 border-r border-slate-800 flex flex-col z-20 shadow-2xl shadow-slate-900/20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/creator/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Layers size={20} />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">CreatorOS</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Workspace</h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 \${
                    isActive 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-emerald-100' : 'text-slate-500'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800">
        <nav className="space-y-1">
          <Link href="/creator/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
            <Settings size={18} className="text-slate-500" />
            Settings
          </Link>
          <Link href="/creator/support" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
            <HelpCircle size={18} className="text-slate-500" />
            Help & Support
          </Link>
        </nav>
      </div>
    </aside>
  );
}
