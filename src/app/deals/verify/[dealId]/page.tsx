import { DEMO_DEAL } from '@/lib/seedData';
import { GlassCard } from '@/components/common/GlassCard';
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-12">
      <Link href={`/deals/${deal.id}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Deal Room
      </Link>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Public Deal Verification</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          This page serves as a publicly verifiable ledger of the cryptographic signatures and finalized terms for this deal.
        </p>
      </div>

      <GlassCard glow="cyan" className="mt-12 p-8 border-cyan-500/30">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Contract Hash Record
            </h2>
            <p className="text-sm text-gray-400 mt-1">Immutable SHA-256 Fingerprint</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Verified Authentic
            </span>
          </div>
        </div>

        <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-cyan-300 break-all border border-cyan-500/20 mb-8">
          {deal.sha256Fingerprint}
        </div>

        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-400" />
          Cryptographic Signatures
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand Sig */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Brand Entity</p>
            <p className="font-medium text-white mb-4">{deal.brandName}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Signatory:</span>
                <span className="text-gray-300">{deal.brandConfirmation?.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Timestamp:</span>
                <span className="text-gray-300">{deal.brandConfirmation?.timestamp}</span>
              </div>
              <div className="pt-2 border-t border-white/10 mt-2">
                <span className="text-gray-500 block text-xs mb-1">Signature Hash:</span>
                <span className="font-mono text-xs text-purple-400">{deal.brandConfirmation?.signatureStamp}</span>
              </div>
            </div>
          </div>

          {/* Creator Sig */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Creator Entity</p>
            <p className="font-medium text-white mb-4">{deal.creatorName}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Signatory:</span>
                <span className="text-gray-300">{deal.creatorConfirmation?.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Timestamp:</span>
                <span className="text-gray-300">{deal.creatorConfirmation?.timestamp}</span>
              </div>
              <div className="pt-2 border-t border-white/10 mt-2">
                <span className="text-gray-500 block text-xs mb-1">Signature Hash:</span>
                <span className="font-mono text-xs text-purple-400">{deal.creatorConfirmation?.signatureStamp}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
