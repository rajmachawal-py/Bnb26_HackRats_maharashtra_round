'use client';
import { useState } from 'react';
import { ComplianceEvaluation } from '@/types/workspace';
import { DEMO_SCRIPTS, DEMO_CAMPAIGN } from '@/lib/seedData';
import { CheckCircle2, AlertTriangle, AlertCircle, Loader2, Play } from 'lucide-react';

export function ComplianceChecker() {
  const [script, setScript] = useState(DEMO_SCRIPTS.erroneousScript);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ComplianceEvaluation | null>(null);

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/ai/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scriptText: script,
          mandatoryTalkingPoints: DEMO_CAMPAIGN.brief.mandatoryTalkingPoints,
          discountCode: DEMO_CAMPAIGN.brief.discountCode,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="saas-card overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 sm:mb-0">Script Draft</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setScript(DEMO_SCRIPTS.erroneousScript)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Load Demo (Errors)
            </button>
            <button 
              onClick={() => setScript(DEMO_SCRIPTS.compliantScript)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Load Demo (Compliant)
            </button>
          </div>
        </div>

        <div className="p-6">
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="textarea-field w-full h-64 mb-4 font-mono text-sm leading-relaxed"
            placeholder="Paste your video script here..."
          />

          <div className="flex justify-end">
            <button
              onClick={handleCheck}
              disabled={isChecking || !script}
              className="btn btn-primary"
            >
              {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span>Run AI Auditor</span>
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className={`saas-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 border-t-4 ${result.overallPassed ? 'border-t-emerald-500' : 'border-t-red-500'}`}>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${result.overallPassed ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {result.overallPassed ? <CheckCircle2 className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {result.overallPassed ? 'Ready for Production' : 'Revisions Required'}
                </h3>
                <p className="text-sm text-slate-600">{result.summaryFeedback}</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                   <p className="text-4xl font-bold text-slate-900 tracking-tighter">{result.score}</p>
                   <p className="text-lg font-medium text-slate-400">/100</p>
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Confidence</p>
              </div>
            </div>

            <div className="space-y-3">
              {result.flags.map((flag) => (
                <div 
                  key={flag.id} 
                  className={`flex gap-4 p-4 rounded-xl border ${
                    flag.type === 'pass' ? 'bg-emerald-50/50 border-emerald-100' : 
                    flag.type === 'warning' ? 'bg-amber-50/50 border-amber-100' : 
                    'bg-red-50/50 border-red-100'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {flag.type === 'pass' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                     flag.type === 'warning' ? <AlertCircle className="w-5 h-5 text-amber-500" /> : 
                     <AlertTriangle className="w-5 h-5 text-red-500" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-0.5 text-sm">{flag.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Est. Length</p>
                <p className="text-lg font-bold text-slate-900">~{Math.floor(result.estimatedDurationSeconds / 60)}m {result.estimatedDurationSeconds % 60}s</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Promo Code</p>
                <p className="text-lg font-bold text-slate-900">{result.promoCodeDetected ? 'Detected' : 'Missing'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">CTA Type</p>
                <p className="text-lg font-bold text-slate-900">{result.ctaDetected ? 'Link in Desc' : 'None'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
