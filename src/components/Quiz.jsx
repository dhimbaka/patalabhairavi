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
    // reset timer for each question
    setSeconds(30)
    setAnswered(false)
    const t = setInterval(() => setSeconds((s) => s - 1), 1000)
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

            <div className="flex justify-center mb-6">
              <div className="text-5xl font-extrabold text-blue-600">{seconds}s</div>
            </div>

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
import React, { useState, useEffect, useRef } from 'react'

export default function Quiz({ quiz, onBack }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [seconds, setSeconds] = useState(30)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)

  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const origTitleRef = useRef(typeof document !== 'undefined' ? document.title : '');

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
      // reset timer for each question
      setSeconds(30)
      setAnswered(false)
      const t = setInterval(() => setSeconds((s) => s - 1), 1000)
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

              <div className="flex justify-center mb-6">
                <div className="text-5xl font-extrabold text-blue-600">{seconds}s</div>
              </div>

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
                let base = 'py-3 px-4 rounded-lg text-left flex items-center gap-3 text-sm font-medium'
                let classes = base + ' transition-shadow'
                if (!answered) classes += ' bg-white dark:bg-gray-900 shadow hover:shadow-md'
                else {
                  if (isCorrect) classes += ' bg-green-100 dark:bg-green-900/30 border border-green-300'
                  else if (isSelected) classes += ' bg-red-100 dark:bg-red-900/30 border border-red-300'
                  else classes += ' bg-gray-50 dark:bg-gray-800'
                }

                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={classes}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold">{String.fromCharCode(65 + i)}</div>
                    <div className="flex-1">{c}</div>
                    {answered && isCorrect && (
                      <div className="text-green-600 font-semibold">✓</div>
                    )}
                    {answered && isSelected && !isCorrect && (
                      <div className="text-red-600 font-semibold">✕</div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h4 className="text-2xl font-bold mb-2">Quiz complete</h4>
            <p className="text-lg">You scored <span className="font-semibold">{score}</span> / {quiz.questions.length}</p>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={onBack} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">Return</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
