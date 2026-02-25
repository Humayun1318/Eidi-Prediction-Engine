export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col items-center justify-center px-4 relative overflow-x-hidden">
      {/* 🌟 Twinkling Stars */}
      <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite]"></div>
      <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-white rounded-full animate-[twinkle_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[25%] left-[10%] w-1 h-1 bg-white rounded-full animate-[twinkle_5s_ease-in-out_infinite]"></div>
      <div className="absolute top-[70%] left-[80%] w-1 h-1 bg-white rounded-full animate-[twinkle_3.5s_ease-in-out_infinite]"></div>
      <div className="absolute top-[45%] left-[30%] w-1 h-1 bg-white rounded-full animate-[twinkle_4.2s_ease-in-out_infinite]"></div>

      {/* 🏮 Hanging Lanterns - Left */}
      <div className="absolute top-0 left-2 sm:left-8 flex flex-col items-center z-0">
        <div className="w-0.5 h-12 sm:h-16 bg-gray-400"></div>
        <div className="w-8 h-10 sm:w-10 sm:h-14 bg-emerald-500 rounded-b-xl shadow-lg shadow-emerald-800 origin-top animate-[swing_4s_ease-in-out_infinite] flex items-center justify-center text-lg">
          💸
        </div>
      </div>

      {/* 🏮 Hanging Lanterns - Right */}
      <div className="absolute top-0 right-2 sm:right-8 flex flex-col items-center z-0">
        <div className="w-0.5 h-16 sm:h-20 bg-gray-400"></div>
        <div className="w-8 h-10 sm:w-10 sm:h-14 bg-yellow-400 rounded-b-xl shadow-lg shadow-yellow-700 origin-top animate-[swing_5s_ease-in-out_infinite] flex items-center justify-center text-lg">
          😭
        </div>
      </div>

      {/* 🌙 Moon - SUBTLE on mobile, normal on desktop */}
      <div className="absolute top-16 right-1/2 translate-x-1/2 sm:right-20 sm:translate-x-0 z-0">
        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-yellow-200/30 sm:bg-yellow-200 rounded-full shadow-lg shadow-yellow-100/20 sm:shadow-yellow-100 flex items-center justify-center text-base sm:text-xl backdrop-blur-[1px] sm:backdrop-blur-0">
          👀
        </div>
      </div>

      {/* MAIN CONTENT - Mobile Optimized, Full Height */}
      <div className="w-full max-w-[320px] sm:max-w-md z-10 flex flex-col items-center justify-center min-h-[90vh] sm:min-h-[80vh]">
        {/* Logo/Brand */}
        <div className="text-center mb-4">
          <span className="text-5xl sm:text-7xl block mb-1 animate-bounce">
            🕵️
          </span>
          <h1 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-yellow-300 to-pink-400 text-transparent bg-clip-text whitespace-nowrap">
            EIDI PREDICTION
          </h1>
        </div>

        {/* Hero Text - Mobile Optimized */}
        <div className="text-center mb-6">
          <p className="text-sm sm:text-base text-gray-300">
            <span className="text-pink-400 font-bold text-base sm:text-lg">
              ২ বছরের ডাটা
            </span>{" "}
            দাও,
            <br />
            <span className="text-yellow-400 font-bold text-base sm:text-lg">
              ২০২৬ এর ঈদি
            </span>{" "}
            বলে দিই
          </p>
          <p className="text-lg sm:text-2xl mt-2 flex flex-wrap items-center justify-center gap-1">
            <span>🤡</span>
            <span className="text-xs sm:text-sm">
              কে দেবে · কে দেখাবে · কে ঘুমাবে
            </span>
            <span>😭</span>
          </p>
        </div>

        {/* Main CTA Card - Thumb Friendly */}
        <div className="w-full bg-white/5 backdrop-blur border-2 border-purple-500/30 rounded-2xl p-5 sm:p-6 text-center hover:border-pink-400 transition-all mb-4">
          <div className="text-4xl sm:text-5xl mb-2">📊</div>
          <h2 className="text-lg sm:text-xl font-bold mb-1">
            Start Prediction
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            add relatives · analyze trends · get roasted
          </p>

          {/* Big Fat Button - Easy to Tap */}
          <button className="w-full py-4 sm:py-5 cursor-pointer bg-linear-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-base sm:text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10">
            <span className="text-xl ">➕</span>
            Add Relatives
            <span className="text-xl">🔥</span>
          </button>

          {/* Social Proof - Mobile Optimized */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] sm:text-xs">
              ৬৯ জন predicting right now
            </span>
          </div>
        </div>

        {/* Feature Pills - Horizontal Scroll on Mobile */}
        <div className="w-full flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="bg-purple-900/30 px-3 py-2 rounded-full border border-purple-500/30 shrink-0">
            <span className="text-xs whitespace-nowrap">📈 trend analysis</span>
          </div>
          <div className="bg-pink-900/30 px-3 py-2 rounded-full border border-pink-500/30 shrink-0">
            <span className="text-xs whitespace-nowrap">
              🎲 luck factor ±10%
            </span>
          </div>
          <div className="bg-yellow-900/30 px-3 py-2 rounded-full border border-yellow-500/30 shrink-0">
            <span className="text-xs whitespace-nowrap">
              😭 emotional damage
            </span>
          </div>
          <div className="bg-red-900/30 px-3 py-2 rounded-full border border-red-500/30 shrink-0">
            <span className="text-xs whitespace-nowrap">
              👻 seen zone alert
            </span>
          </div>
        </div>

        {/* Funny Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 flex flex-wrap items-center justify-center gap-1">
            <span>⚠️</span>
            <span>"কাল দিচ্ছি" detection since 2019</span>
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1 flex items-center justify-center gap-2">
            <span>👻 ৩ relatives in seen zone</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>💸 ২ uncles "abroad"</span>
          </p>
        </div>
      </div>

      {/* Extra Sparkles */}
      <div className="absolute bottom-2 left-2 text-xs opacity-30 hidden sm:block">
        Made by Humayun
      </div>
      <div className="absolute bottom-2 right-2 text-xs opacity-30 hidden sm:block">
        © 2026 Eidi Prediction Engine
      </div>
    </main>
  );
}
