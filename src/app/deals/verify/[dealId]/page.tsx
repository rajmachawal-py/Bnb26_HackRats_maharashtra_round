import { DEMO_DEAL } from '@/lib/seedData';
import { ShieldCheck, Lock, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface VerifyPageProps {
  params: Promise<{ dealId: string }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const resolvedParams = await params;
  const dealId = resolvedParams.dealId;

  // In a real app, fetch from DB or Blockchain ledger
  const deal = dealId === DEMO_DEAL.id ? DEMO_DEAL : null;

  if (!deal) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <Link href={`/deals/${deal.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Deal Room
      </Link>

      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-600 mb-2 ring-8 ring-primary-50/50">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Public Deal Verification</h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          This page serves as a publicly verifiable ledger of the cryptographic signatures and finalized terms for this deal.
        </p>
      </div>

      <div className="saas-card overflow-hidden border-primary-200 ring-1 ring-primary-100 shadow-xl shadow-primary-900/5">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-500" />
                Contract Hash Record
              </h2>
              <p className="text-sm text-slate-500 mt-1">Immutable SHA-256 Fingerprint</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                Verified Authentic
              </span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-primary-300 break-all border border-slate-800 shadow-inner">
            {deal.sha256Fingerprint}
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-400" />
            Cryptographic Signatures
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Sig */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Brand Entity</p>
              <p className="font-bold text-slate-900 text-lg mb-6">{deal.brandName}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Signatory:</span>
                  <span className="text-slate-900 font-semibold">{deal.brandConfirmation?.userName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Timestamp:</span>
                  <span className="text-slate-900 font-mono">{deal.brandConfirmation?.timestamp}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 block text-xs font-medium mb-1">Signature Hash:</span>
                  <span className="font-mono text-xs text-primary-600 break-all">{deal.brandConfirmation?.signatureStamp}</span>
                </div>
              </div>
            </div>

            {/* Creator Sig */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Creator Entity</p>
              <p className="font-bold text-slate-900 text-lg mb-6">{deal.creatorName}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Signatory:</span>
                  <span className="text-slate-900 font-semibold">{deal.creatorConfirmation?.userName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Timestamp:</span>
                  <span className="text-slate-900 font-mono">{deal.creatorConfirmation?.timestamp}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 block text-xs font-medium mb-1">Signature Hash:</span>
                  <span className="font-mono text-xs text-primary-600 break-all">{deal.creatorConfirmation?.signatureStamp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
