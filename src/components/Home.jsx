import React from 'react'

export default function Home({ quizzes, onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl relative bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-lg shadow-lg overflow-hidden" style={{height: '64vh'}}>
        {/* simple illustrated path (SVG) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#efe3c8" />
              <stop offset="100%" stopColor="#c9a66b" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#g)" />
          <path d="M5,85 C20,60 40,60 55,75 C70,90 85,60 95,40" stroke="#6b4f2b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* hero running (top view) */}
        <div style={{position: 'absolute', left: '8%', top: '72%'}} title="Hero">
          <div className="w-8 h-8 rounded-full bg-red-600 shadow-lg animate-bounce" />
        </div>

        {/* ruins markers */}
        {quizzes.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.id)}
            style={{position: 'absolute', left: q.x, top: q.y, transform: 'translate(-50%,-50%)'}}
            className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center shadow-md hover:scale-110 transition"
            title={q.name}
          >
            R
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-xl font-semibold">Explore the ruins — tap a ruin to take its quiz</h2>
      <p className="text-sm text-gray-600 mt-2">Each ruin holds questions about the classic Telugu film <strong>Patala Bhairavi</strong>.</p>
    </div>
  )
}
