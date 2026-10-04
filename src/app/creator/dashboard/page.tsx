import React from 'react';
import { Wallet, Briefcase, Clock, TrendingUp, Inbox } from 'lucide-react';

export default function CreatorDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Alex!</h1>
        <p className="text-slate-500">Here is an overview of your active deals and tasks.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="saas-card p-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Wallet size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">₹1.2L</div>
          <div className="text-sm text-slate-500">Total Earnings</div>
        </div>
        <div className="saas-card p-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Briefcase size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">3</div>
          <div className="text-sm text-slate-500">Active Deals</div>
        </div>
        <div className="saas-card p-6">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Clock size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">2</div>
          <div className="text-sm text-slate-500">Pending Tasks</div>
        </div>
        <div className="saas-card p-6">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <TrendingUp size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">94%</div>
          <div className="text-sm text-slate-500">Compliance Score</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="saas-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Active Deliverables</h2>
            <div className="space-y-4">
              <div className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">CyberFlow Launch Video</h3>
                  <p className="text-sm text-slate-500">Due in 3 days • TechBrand Inc.</p>
                </div>
                <button className="btn btn-primary text-sm px-4 py-2">Submit Draft</button>
              </div>
              <div className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">React Developer Tools Shorts</h3>
                  <p className="text-sm text-slate-500">Due next week • TechBrand Inc.</p>
                </div>
                <button className="btn btn-secondary text-sm px-4 py-2">View Brief</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="saas-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Incoming Offers</h2>
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
                <Inbox className="text-slate-400" size={24} />
              </div>
              <p className="text-sm text-slate-500">No new offers at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
