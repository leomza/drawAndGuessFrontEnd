import './App.css'
import { useState } from 'react'

import SessionContext from './context/SessionContext'

import Welcome from './components/views/Welcome'
import NotFound from './components/commons/NotFound'
import WordChossing from './components/views/WordChossing'
import Drawing from './components/views/Drawing'
import Guessing from './components/views/Guessing'
import ErrorBoundary from './components/commons/ErrorComponent'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App () {
  const [chooseWord, setChooseWord] = useState({})
  const [session, setSession] = useState(null)
  const [userLogin, setUserLogin] = useState(null)
  const [sessionPoints, setSessionPoints] = useState(0)

  const handleWord = selectedWord => {
    setChooseWord(selectedWord)
  }

  return (
    <ErrorBoundary>
      <SessionContext.Provider
        value={{
          session,
          setSession,
          userLogin,
          setUserLogin,
          sessionPoints,
          setSessionPoints
        }}
      >
        <Router>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route
              path='/session/:sessionId/:userId'
              element={<Drawing {...{ chooseWord }} />}
            />
            <Route
              path='/word/:sessionId/:userId'
              element={<WordChossing {...{ handleWord }} />}
            />
            <Route path='/guessing/:sessionId/:userId' element={<Guessing />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </SessionContext.Provider>
    </ErrorBoundary>
  )
}

export default App
