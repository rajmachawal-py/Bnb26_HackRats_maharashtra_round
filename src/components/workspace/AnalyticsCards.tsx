import { CampaignMetricsSnapshot } from '@/types/workspace';
import { BarChart3, TrendingUp, Users, MousePointerClick, DollarSign } from 'lucide-react';

export function AnalyticsCards({ metrics }: { metrics: CampaignMetricsSnapshot }) {
  const compactNum = (num: number) => 
    new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Reach Card */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Views</h4>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">{compactNum(metrics.totalViews)}</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% vs expected
            </p>
          </div>
        </div>

        {/* Engagement Card */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engagement</h4>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">{metrics.engagementRate.toFixed(1)}%</p>
            <p className="text-xs font-medium text-slate-500 mt-1">{compactNum(metrics.totalEngagements)} interactions</p>
          </div>
        </div>

        {/* Clicks Card */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Link Clicks</h4>
            <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">{compactNum(metrics.clickThroughs)}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {((metrics.clickThroughs / metrics.totalViews) * 100).toFixed(1)}% CTR
            </p>
          </div>
        </div>

        {/* ROI Card */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Value</h4>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">${compactNum(metrics.revenueGenerated)}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">CPA: ${metrics.effectiveCPA.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="saas-card p-6">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Performance Timeline</h3>
        <div className="h-64 w-full border border-slate-100 rounded-lg flex items-center justify-center bg-slate-50/50">
           <p className="text-slate-500 text-sm flex items-center gap-2">
             <BarChart3 className="w-5 h-5" />
             Chart rendering requires historical data
           </p>
        </div>
      </div>
    </div>
  );
}
