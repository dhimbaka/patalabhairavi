import React from 'react'

export default function Home({ quizzes, onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl relative rounded-lg shadow-2xl overflow-hidden" style={{height: '68vh'}}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full block">
          <defs>
            <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f3e9d2" />
              <stop offset="100%" stopColor="#c79f57" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="3" floodOpacity="0.25"/>
            </filter>
          </defs>

          {/* background sky */}
          <rect x="0" y="0" width="100" height="100" fill="url(#sky)" />

          {/* distant ruins silhouette */}
          <g fill="#6b4f2b" opacity="0.12">
            <path d="M0,60 C10,58 18,50 28,54 C38,58 48,52 58,56 C68,60 78,48 88,50 L100,46 L100,100 L0,100 Z" />
          </g>

          {/* worn path base (thick light) */}
          <path id="trail-base" d="M5,85 C20,60 40,60 55,75 C70,90 85,60 95,40" stroke="#e9d6b0" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {/* path edge for contrast */}
          <path id="trail-edge" d="M5,85 C20,60 40,60 55,75 C70,90 85,60 95,40" stroke="#7b5a2f" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

          {/* scattered stones */}
          <g fill="#7b5a2f" opacity="0.85">
            <circle cx="12" cy="78" r="0.6" />
            <circle cx="22" cy="68" r="0.5" />
            <circle cx="35" cy="65" r="0.6" />
            <circle cx="48" cy="71" r="0.5" />
            <circle cx="63" cy="82" r="0.6" />
            <circle cx="78" cy="68" r="0.5" />
            <circle cx="88" cy="50" r="0.6" />
          </g>

          {/* subtle vignette */}
          <rect x="0" y="0" width="100" height="100" fill="black" opacity="0.03" />
        </svg>

        {/* animated hero (top view) */}
        <div aria-hidden style={{position: 'absolute', left: '8%', top: '72%', transform: 'translate(-50%,-50%)'}}>
          <div className="hero-run relative flex items-center justify-center">
            <div className="hero-shadow absolute w-8 h-2 bg-black opacity-20 rounded-full -bottom-1 blur-sm" />
            <div className="w-8 h-8 rounded-full bg-red-600 ring-2 ring-red-300 animate-hero-run shadow-lg" />
          </div>
        </div>

        {/* cinematic ruin markers */}
        {quizzes.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.id)}
            style={{position: 'absolute', left: q.x, top: q.y, transform: 'translate(-50%,-50%)'}}
            className="ruin-marker flex items-center justify-center"
            title={q.name}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="3" width="2" height="16" rx="0.5" fill="#f8fafc" opacity="0.95"/>
              <rect x="9" y="3" width="2" height="16" rx="0.5" fill="#f8fafc" opacity="0.95"/>
              <rect x="14" y="3" width="2" height="16" rx="0.5" fill="#f8fafc" opacity="0.95"/>
              <rect x="3" y="2" width="18" height="2" rx="0.5" fill="#d6c3a1"/>
            </svg>
          </button>
        ))}

      </div>

      <h2 className="mt-6 text-xl font-semibold">Explore the ruins — tap a ruin to take its quiz</h2>
      <p className="text-sm text-gray-600 mt-2">Each ruin holds questions about the classic Telugu film <strong>Patala Bhairavi</strong>.</p>
    </div>
  )
}
