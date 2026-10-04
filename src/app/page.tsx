import React from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Megaphone, 
  Users, 
  Wallet,
  Clock,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import { SEED_CREATORS } from '@/lib/seedData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCompactNumber } from '@/lib/utils';

export default function DashboardPage() {
  const recommendedCreators = SEED_CREATORS.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, TechBrand</h1>
          <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening across your creator partnerships.</p>
        </div>
        <Link href="/campaigns/new" className="btn btn-primary">
          <Plus size={16} />
          Create Campaign
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Campaigns', value: '12', icon: <Megaphone size={20} className="text-primary-600" />, trend: '+2 this week' },
          { label: 'Pending Applications', value: '8', icon: <Clock size={20} className="text-amber-600" />, trend: '3 need review' },
          { label: 'Active Creators', value: '34', icon: <Users size={20} className="text-emerald-600" />, trend: '+15% from last month' },
          { label: 'Campaign Spend', value: '₹2.4L', icon: <Wallet size={20} className="text-violet-600" />, trend: 'On budget' },
        ].map((stat, i) => (
          <div key={i} className="saas-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <div className="text-sm font-medium text-slate-600 mb-2">{stat.label}</div>
            <div className="text-xs text-slate-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Campaigns Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Active Campaigns</h2>
            <Link href="/campaigns" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          
          <div className="saas-card overflow-hidden">
            <table className="saas-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Creators</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Budget</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Summer Product Launch', creators: 4, status: 'Active', deadline: '25 Oct 2026', budget: '₹75,000' },
                  { name: 'CyberFlow Awareness', creators: 12, status: 'Reviewing', deadline: '01 Nov 2026', budget: '₹1.2L' },
                  { name: 'Developer Tool React', creators: 2, status: 'Planning', deadline: '15 Nov 2026', budget: '₹45,000' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="font-medium">{row.name}</td>
                    <td>
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(row.creators, 3))].map((_, j) => (
                            <div key={j} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                          ))}
                        </div>
                        {row.creators > 3 && <span className="text-xs text-slate-500 ml-2">+{row.creators - 3}</span>}
                      </div>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        row.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        row.status === 'Reviewing' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="text-slate-500 text-sm">{row.deadline}</td>
                    <td className="font-medium text-sm">{row.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
          <div className="saas-card p-5">
            <div className="space-y-6">
              {[
                { user: 'Sarah Sharma', action: 'submitted content for review', time: '2 hours ago', type: 'content' },
                { user: 'Summer Launch', action: 'campaign was approved', time: '5 hours ago', type: 'approval' },
                { user: 'Alex Vance', action: 'signed the contract agreement', time: 'Yesterday', type: 'contract' },
                { user: 'Marques B.', action: 'viewed your campaign invite', time: 'Yesterday', type: 'view' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500 ring-4 ring-primary-50"></div>
                    {i !== 3 && <div className="absolute top-3 left-1 w-px h-10 bg-slate-200"></div>}
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              View all activity
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Creators */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recommended for you</h2>
            <p className="text-sm text-slate-500">Based on your recent Tech & Software campaigns</p>
          </div>
          <Link href="/discover" className="btn btn-secondary btn-sm">
            Discover more <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCreators.map((creator) => (
            <div key={creator.id} className="saas-card p-5 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{creator.name}</h4>
                    <p className="text-xs text-slate-500">@{creator.slug}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
              </div>

              <div className="text-xs text-slate-600 mb-4 font-medium px-2 py-1 bg-slate-100 rounded-md self-start">
                {creator.niche.join(' • ')}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Followers</div>
                  <div className="font-semibold text-slate-900">
                    {formatCompactNumber(Object.values(creator.platforms).reduce((acc, platform: any) => acc + (platform?.followers || platform?.subscribers || 0), 0))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Engagement</div>
                  <div className="font-semibold text-slate-900">{creator.metrics.avgEngagement}%</div>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <Link href={`/discover/${creator.id}`} className="btn btn-secondary flex-1">
                  View Profile
                </Link>
                <button className="btn btn-primary flex-1">
                  Invite
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
