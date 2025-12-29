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

  if (!quiz) return null

  const q = quiz.questions[index]

  useEffect(() => {
    // reset per-question state
    setSeconds(30)
    setAnswered(false)
    setSelected(null)

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s - 1)
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index])

  useEffect(() => {
    if (seconds <= 0 && !answered) {
      handleTimeUp()
    }
  }, [seconds, answered])

  function advance() {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null }

    if (index + 1 < quiz.questions.length) setIndex((n) => n + 1)
    else setDone(true)
  }

  function handleTimeUp() {
    setAnswered(true)
    setSelected(null)
    timeoutRef.current = setTimeout(() => {
      advance()
    }, 900)
  }

  function choose(i) {
    if (answered) return
    setAnswered(true)
    setSelected(i)
    if (i === q.a) setScore((s) => s + 1)

    // show feedback briefly then move on
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    timeoutRef.current = setTimeout(() => {
      advance()
    }, 900)
  }

  const progressPct = Math.round(((index) / quiz.questions.length) * 100)
  const timePct = Math.max(0, Math.round((seconds / 30) * 100))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <button className="text-sm text-blue-600" onClick={onBack}>&larr; Back</button>
          <div className="text-center">
            <div className="text-xs text-gray-500">{quiz.name}</div>
            <div className="text-2xs text-gray-400 text-[11px]">{quiz.desc}</div>
          </div>
          <div className="w-8" />
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Question {index + 1} / {quiz.questions.length}</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">{seconds}s</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all" style={{ width: `${timePct}%` }} />
          </div>
          <div className="mt-2 w-full bg-gray-100 dark:bg-gray-900 h-1 rounded-full overflow-hidden">
            <div className="h-1 bg-blue-400 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {!done ? (
          <div>
            <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">{q.q}</p>

            <div className="grid gap-3">
              {q.choices.map((c, i) => {
                const isCorrect = i === q.a
                const isSelected = selected === i
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
