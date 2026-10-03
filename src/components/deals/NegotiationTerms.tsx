'use client';
import { Deal } from '@/types/deal';
import { useRole } from '@/lib/roleContext';
import { GlassCard } from '../common/GlassCard';
import { CheckCircle, Clock, FileDown, ShieldCheck } from 'lucide-react';
import { downloadContractPdf } from '@/lib/pdf/generateContract';
import confetti from 'canvas-confetti';
import { useState } from 'react';

interface NegotiationTermsProps {
  deal: Deal;
}

export function NegotiationTerms({ deal }: NegotiationTermsProps) {
  const { currentRole } = useRole();
  const isBrand = currentRole === 'brand';
  const isCreator = currentRole === 'creator';
  
  // Local state to simulate live signing during pitch
  const [localBrandSigned, setLocalBrandSigned] = useState(false);
  const [localCreatorSigned, setLocalCreatorSigned] = useState(false);

  const handleSign = (party: 'brand' | 'creator') => {
    if (party === 'brand') setLocalBrandSigned(true);
    if (party === 'creator') setLocalCreatorSigned(true);
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#06B6D4', '#10B981']
    });
  };
  
  const brandIsSigned = deal.brandConfirmation || localBrandSigned;
  const creatorIsSigned = deal.creatorConfirmation || localCreatorSigned;
  
  return (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          Commercial Terms
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Compensation</p>
              <p className="font-semibold text-2xl text-emerald-400">
                ${deal.terms.compensationAmount.toLocaleString()}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-1">Deliverables</p>
              <ul className="list-disc pl-5 space-y-1">
                {deal.terms.deliverablesSummary.map((d, i) => (
                  <li key={i} className="text-white">{d}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
             <div>
               <p className="text-sm text-gray-400 mb-1">Publishing Deadline</p>
               <p className="text-white font-medium">{new Date(deal.terms.publishingDeadline).toLocaleDateString()}</p>
             </div>
             <div>
               <p className="text-sm text-gray-400 mb-1">Exclusivity</p>
               <p className="text-white font-medium">{deal.terms.exclusivityDays} Days</p>
             </div>
             <div>
               <p className="text-sm text-gray-400 mb-1">Usage Rights</p>
               <p className="text-white font-medium">{deal.terms.usageRightsDuration}</p>
             </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Agreement Status</h3>
          <button 
            onClick={() => downloadContractPdf(deal)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <FileDown className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="space-y-4">
          {/* Brand Confirmation */}
          <div className={`flex items-center justify-between p-4 rounded-xl border \${brandIsSigned ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
            <div>
              <p className="font-medium text-white flex items-center gap-2">
                Brand Confirmation
                {brandIsSigned && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full animate-in zoom-in">Signed</span>}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {brandIsSigned ? (deal.brandConfirmation ? `Signed by \${deal.brandConfirmation.userName} on \${new Date(deal.brandConfirmation.timestamp).toLocaleDateString()}` : 'Signed just now') : 'Waiting for brand signature...'}
              </p>
            </div>
            {brandIsSigned ? (
              <CheckCircle className="text-green-400 w-8 h-8 animate-in scale-in duration-300" />
            ) : (
              isBrand ? (
                <button 
                  onClick={() => handleSign('brand')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Sign as Brand
                </button>
              ) : (
                <Clock className="text-yellow-400 w-8 h-8" />
              )
            )}
          </div>
          
          {/* Creator Confirmation */}
          <div className={`flex items-center justify-between p-4 rounded-xl border \${creatorIsSigned ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
            <div>
              <p className="font-medium text-white flex items-center gap-2">
                Creator Confirmation
                {creatorIsSigned && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full animate-in zoom-in">Signed</span>}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {creatorIsSigned ? (deal.creatorConfirmation ? `Signed by \${deal.creatorConfirmation.userName} on \${new Date(deal.creatorConfirmation.timestamp).toLocaleDateString()}` : 'Signed just now') : 'Waiting for creator signature...'}
              </p>
            </div>
            {creatorIsSigned ? (
              <CheckCircle className="text-green-400 w-8 h-8 animate-in scale-in duration-300" />
            ) : (
              isCreator ? (
                <button 
                  onClick={() => handleSign('creator')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Sign as Creator
                </button>
              ) : (
                <Clock className="text-yellow-400 w-8 h-8" />
              )
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
