'use client';
import { useState } from 'react';
import { ComplianceEvaluation } from '@/types/workspace';
import { DEMO_SCRIPTS, DEMO_CAMPAIGN } from '@/lib/seedData';
import { GlassCard } from '../common/GlassCard';
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
      <GlassCard>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Script Draft</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setScript(DEMO_SCRIPTS.erroneousScript)}
              className="px-3 py-1 text-xs rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            >
              Load Demo (Errors)
            </button>
            <button 
              onClick={() => setScript(DEMO_SCRIPTS.compliantScript)}
              className="px-3 py-1 text-xs rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            >
              Load Demo (Compliant)
            </button>
          </div>
        </div>

        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-purple-500/50 transition-colors resize-none mb-4"
          placeholder="Paste your video script here..."
        />

        <div className="flex justify-end">
          <button
            onClick={handleCheck}
            disabled={isChecking || !script}
            className="btn-primary flex items-center gap-2"
          >
            {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run AI Auditor
          </button>
        </div>
      </GlassCard>

      {result && (
        <GlassCard glow={result.overallPassed ? 'cyan' : 'purple'} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center \${result.overallPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {result.overallPassed ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {result.overallPassed ? 'Ready for Production' : 'Revisions Required'}
              </h3>
              <p className="text-sm text-gray-400">{result.summaryFeedback}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-white">{result.score}<span className="text-lg text-gray-500">/100</span></p>
              <p className="text-xs text-gray-500">Confidence Score</p>
            </div>
          </div>

          <div className="space-y-4">
            {result.flags.map((flag) => (
              <div 
                key={flag.id} 
                className={`flex gap-4 p-4 rounded-xl border \${
                  flag.type === 'pass' ? 'bg-green-500/5 border-green-500/20' : 
                  flag.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20' : 
                  'bg-red-500/5 border-red-500/20'
                }`}
              >
                {flag.type === 'pass' ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : 
                 flag.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" /> : 
                 <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
                
                <div>
                  <p className="font-medium text-white mb-1">{flag.title}</p>
                  <p className="text-sm text-gray-400">{flag.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">Estimated Length</p>
              <p className="text-sm font-medium text-white">~{Math.floor(result.estimatedDurationSeconds / 60)}m {result.estimatedDurationSeconds % 60}s</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Promo Code</p>
              <p className="text-sm font-medium text-white">{result.promoCodeDetected ? 'Detected' : 'Missing'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">CTA Type</p>
              <p className="text-sm font-medium text-white">{result.ctaDetected ? 'Link in Bio/Desc' : 'None'}</p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
