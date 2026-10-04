'use client';
import { Deal } from '@/types/deal';
import { useRole } from '@/lib/roleContext';
import { CheckCircle, Clock, FileDown, ShieldCheck, PenTool } from 'lucide-react';
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
      colors: ['#4F46E5', '#0EA5E9', '#10B981']
    });
  };
  
  const brandIsSigned = deal.brandConfirmation || localBrandSigned;
  const creatorIsSigned = deal.creatorConfirmation || localCreatorSigned;
  
  return (
    <div className="space-y-6">
      <div className="saas-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Commercial Terms
          </h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Compensation</p>
              <p className="font-bold text-3xl text-emerald-600">
                ${deal.terms.compensationAmount.toLocaleString()}
              </p>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Deliverables</p>
              <ul className="space-y-1.5">
                {deal.terms.deliverablesSummary.map((d, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                     <span className="text-primary-500 mt-0.5">•</span>
                     {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
             <div>
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Publishing Deadline</p>
               <p className="text-sm font-medium text-slate-900">{new Date(deal.terms.publishingDeadline).toLocaleDateString()}</p>
             </div>
             <div>
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Exclusivity</p>
               <p className="text-sm font-medium text-slate-900">{deal.terms.exclusivityDays} Days</p>
             </div>
             <div>
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Usage Rights</p>
               <p className="text-sm font-medium text-slate-900">{deal.terms.usageRightsDuration}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="saas-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Agreement Status</h3>
          <button 
            onClick={() => downloadContractPdf(deal)}
            className="btn btn-secondary btn-sm"
          >
            <FileDown className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="space-y-4">
          {/* Brand Confirmation */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border ${brandIsSigned ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="mb-4 sm:mb-0">
              <div className="font-semibold text-slate-900 flex items-center gap-2 mb-1">
                Brand Confirmation
                {brandIsSigned && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Signed</span>}
              </div>
              <p className="text-sm text-slate-500">
                {brandIsSigned ? (deal.brandConfirmation ? `Signed by ${deal.brandConfirmation.userName} on ${new Date(deal.brandConfirmation.timestamp).toLocaleDateString()}` : 'Signed just now') : 'Waiting for brand signature...'}
              </p>
            </div>
            {brandIsSigned ? (
              <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-white px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100">
                <CheckCircle className="w-5 h-5" /> Confirmed
              </div>
            ) : (
              isBrand ? (
                <button 
                  onClick={() => handleSign('brand')}
                  className="btn btn-primary"
                >
                  <PenTool className="w-4 h-4" />
                  Sign as Brand
                </button>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                  <Clock className="w-4 h-4" /> Pending
                </div>
              )
            )}
          </div>
          
          {/* Creator Confirmation */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border ${creatorIsSigned ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="mb-4 sm:mb-0">
              <div className="font-semibold text-slate-900 flex items-center gap-2 mb-1">
                Creator Confirmation
                {creatorIsSigned && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Signed</span>}
              </div>
              <p className="text-sm text-slate-500">
                {creatorIsSigned ? (deal.creatorConfirmation ? `Signed by ${deal.creatorConfirmation.userName} on ${new Date(deal.creatorConfirmation.timestamp).toLocaleDateString()}` : 'Signed just now') : 'Waiting for creator signature...'}
              </p>
            </div>
            {creatorIsSigned ? (
              <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-white px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100">
                <CheckCircle className="w-5 h-5" /> Confirmed
              </div>
            ) : (
              isCreator ? (
                <button 
                  onClick={() => handleSign('creator')}
                  className="btn btn-primary"
                >
                  <PenTool className="w-4 h-4" />
                  Sign as Creator
                </button>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                  <Clock className="w-4 h-4" /> Pending
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
