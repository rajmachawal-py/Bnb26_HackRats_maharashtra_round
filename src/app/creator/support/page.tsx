export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-2xl">🚧</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon</h1>
      <p className="text-slate-500 max-w-md">This section is currently under construction and will be available in the next release.</p>
    </div>
  );
}
