import { DEMO_DEAL } from '@/lib/seedData';
import { NegotiationTerms } from '@/components/deals/NegotiationTerms';
import { Activity } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Deal Room: {deal.id}</h1>
          <p className="text-sm text-slate-500">
            Between <span className="text-slate-900 font-semibold">{deal.brandName}</span> and <span className="text-slate-900 font-semibold">{deal.creatorName}</span>
          </p>
        </div>
        
        <Link 
          href={`/deals/verify/${deal.id}`}
          className="btn btn-secondary bg-slate-50 border-slate-200 text-slate-700"
        >
          <Activity className="w-4 h-4 text-primary-500" />
          <span>View Public Ledger Audit</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Left Column: Terms & Negotiation (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          <NegotiationTerms deal={deal} />
        </div>

        {/* Right Column: Audit Log (1/3 width) */}
        <div className="xl:col-span-1 space-y-6 sticky top-24">
          <div className="saas-card p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Audit Log</h3>
            <div className="relative border-l border-slate-200 ml-2 space-y-6">
              {deal.history.map((event) => (
                <div key={event.id} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-primary-50" />
                  
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900 leading-tight">{event.action}</span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-xs text-primary-600 font-medium mb-1">{event.actor} (v{event.version})</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{event.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
