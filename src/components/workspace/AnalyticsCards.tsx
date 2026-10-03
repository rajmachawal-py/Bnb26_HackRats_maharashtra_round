import { CampaignMetricsSnapshot } from '@/types/workspace';
import { GlassCard } from '../common/GlassCard';
import { BarChart3, TrendingUp, Users, MousePointerClick, DollarSign } from 'lucide-react';

export function AnalyticsCards({ metrics }: { metrics: CampaignMetricsSnapshot }) {
  const compactNum = (num: number) => 
    new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Reach Card */}
        <GlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-400">Total Views</h4>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{compactNum(metrics.totalViews)}</p>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% vs expected
            </p>
          </div>
        </GlassCard>

        {/* Engagement Card */}
        <GlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-400">Engagement</h4>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{metrics.engagementRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-1">{compactNum(metrics.totalEngagements)} interactions</p>
          </div>
        </GlassCard>

        {/* Clicks Card */}
        <GlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-400">Link Clicks</h4>
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{compactNum(metrics.clickThroughs)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {((metrics.clickThroughs / metrics.totalViews) * 100).toFixed(1)}% CTR
            </p>
          </div>
        </GlassCard>

        {/* ROI Card */}
        <GlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-400">Est. Value</h4>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">${compactNum(metrics.revenueGenerated)}</p>
            <p className="text-xs text-gray-500 mt-1">CPA: ${metrics.effectiveCPA.toFixed(2)}</p>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Performance Timeline</h3>
        <div className="h-48 w-full border border-white/5 rounded flex items-center justify-center bg-black/20">
           <p className="text-gray-500 text-sm flex items-center gap-2">
             <BarChart3 className="w-4 h-4" />
             Chart rendering requires historical data (Post-hackathon implementation)
           </p>
        </div>
      </GlassCard>
    </div>
  );
}
