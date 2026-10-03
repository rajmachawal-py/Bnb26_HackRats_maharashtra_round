import { DEMO_DEAL } from '@/lib/seedData';
import { NegotiationTerms } from '@/components/deals/NegotiationTerms';
import { GlassCard } from '@/components/common/GlassCard';
import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface DealPageProps {
  params: Promise<{ dealId: string }>;
}

export default async function DealPage({ params }: DealPageProps) {
  const resolvedParams = await params;
  const dealId = resolvedParams.dealId;

  // In a real app, fetch from DB
  const deal = dealId === DEMO_DEAL.id ? DEMO_DEAL : null;

  if (!deal) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Deal Room: {deal.id}</h1>
          <p className="text-gray-400">
            Between <span className="text-white font-medium">{deal.brandName}</span> and <span className="text-white font-medium">{deal.creatorName}</span>
          </p>
        </div>
        
        <Link 
          href={`/deals/verify/${deal.id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
        >
          <Activity className="w-4 h-4" />
          <span className="text-sm font-medium">View Public Ledger Audit</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Terms & Negotiation (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <NegotiationTerms deal={deal} />
        </div>

        {/* Right Column: Audit Log (1/3 width) */}
        <div className="space-y-6">
          <GlassCard className="h-full">
            <h3 className="text-xl font-semibold text-white mb-6">Audit Log</h3>
            <div className="relative border-l border-white/10 ml-3 space-y-6">
              {deal.history.map((event, index) => (
                <div key={event.id} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-gray-900" />
                  
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{event.action}</span>
                    <span className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-xs text-purple-400 mb-1">{event.actor} (v{event.version})</p>
                  <p className="text-sm text-gray-400">{event.details}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
