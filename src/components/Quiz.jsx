import React, { useState, useEffect } from 'react'

export default function Quiz({ quiz, onBack }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [seconds, setSeconds] = useState(30)
  const [answered, setAnswered] = useState(false)

  if (!quiz) return null

  const q = quiz.questions[index]

  useEffect(() => {
    if (done) return
    setSeconds(30)
    setAnswered(false)
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [index])

  useEffect(() => {
    if (seconds <= 0 && !answered) {
      setAnswered(true)
      setTimeout(() => {
        if (index + 1 < quiz.questions.length) setIndex((n) => n + 1)
        else setDone(true)
      }, 800)
    }
  }, [seconds, answered, index, quiz.questions.length])

  // when quiz is finished, ensure timer is stopped/zeroed
  useEffect(() => {
    if (done) setSeconds(0)
  }, [done])

  function choose(i) {
    if (answered) return
    setAnswered(true)
    if (i === q.a) setScore((s) => s + 1)
    setTimeout(() => {
      if (index + 1 < quiz.questions.length) setIndex((n) => n + 1)
      else setDone(true)
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Persistent overlay timer for visibility */}
      <div aria-hidden className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-lg text-lg">{seconds}s</div>
      </div>
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button className="text-sm text-blue-600" onClick={onBack}>&larr; Back</button>
          <div className="text-sm text-gray-500">Question {index + 1} / {quiz.questions.length}</div>
        </div>

        {!done ? (
          <div>
            <h3 className="text-2xl font-bold mb-2">{quiz.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{quiz.desc}</p>

            <p className="mb-4 text-lg font-semibold">{q.q}</p>

            {/* in-page timer removed (overlay kept) */}

            <div className="grid gap-3">
              {q.choices.map((c, i) => (
                <button key={i} onClick={() => choose(i)} disabled={answered} className="py-3 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 text-left">
                  <div className="font-medium">{String.fromCharCode(65 + i)}. {c}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h4 className="text-xl font-semibold">Quiz complete</h4>
            <p className="mt-2">You scored {score} / {quiz.questions.length}</p>
            <div className="mt-4 flex gap-3 justify-center">
              <button onClick={onBack} className="px-4 py-2 rounded bg-gray-200">Return</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
