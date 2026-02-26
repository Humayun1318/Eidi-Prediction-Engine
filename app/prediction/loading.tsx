// app/prediction/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin">🔮</div>
        <h2 className="text-2xl font-bold mb-2">
          Calculating your Eid destiny...
        </h2>
        <p className="text-gray-400">Analyzing 2 years of betrayal</p>
        <div className="mt-4 w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
