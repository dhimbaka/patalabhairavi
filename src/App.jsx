import { useState } from 'react'
import './App.css'
import quizzes from './data/quizzes'
import Home from './components/Home'
import Quiz from './components/Quiz'

function App() {
  const [view, setView] = useState('home')
  const [selected, setSelected] = useState(null)

  function openQuiz(id) {
    setSelected(quizzes.find((q) => q.id === id))
    setView('quiz')
  }

  return (
    <div>
      {view === 'home' && <Home quizzes={quizzes} onSelect={openQuiz} />}
      {view === 'quiz' && <Quiz quiz={selected} onBack={() => { setView('home'); setSelected(null); }} />}
    </div>
  )
}

export default App
