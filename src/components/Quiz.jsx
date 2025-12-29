import React, { useState } from 'react'

export default function Quiz({ quiz, onBack }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!quiz) return null

  const q = quiz.questions[index]

  function choose(i) {
    if (i === q.a) setScore((s) => s + 1)
    if (index + 1 < quiz.questions.length) setIndex((n) => n + 1)
    else setDone(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <button className="mb-4 text-sm text-blue-600" onClick={onBack}>&larr; Back to ruins</button>
        <h3 className="text-2xl font-bold mb-2">{quiz.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{quiz.desc}</p>

        {!done ? (
          <div>
            <p className="mb-4 font-medium">Question {index + 1} of {quiz.questions.length}</p>
            <p className="mb-6 text-lg">{q.q}</p>
            <div className="grid gap-3">
              {q.choices.map((c, i) => (
                <button key={i} onClick={() => choose(i)} className="py-2 px-3 rounded bg-blue-600 text-white hover:bg-blue-700">
                  {c}
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
