// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">😭</div>
        <h1 className="text-3xl font-bold mb-2">404 - Not Found</h1>
        <p className="text-gray-400 mb-6">
          এই prediction টা পাওয়া যায়নি! হয়তো কেউ ডিলিট করে দিছে 👻
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
