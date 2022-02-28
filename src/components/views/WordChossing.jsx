import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import randomWords from 'random-words'
import { Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import SessionContext from '../../context/SessionContext'
import Loading from '../commons/Loading'
import Username from '../commons/Username'
import SessionPoints from '../commons/SessionPoints'
import { url } from '../../config'

export default function WordChossing ({ handleWord }) {
  const navigate = useNavigate()
  const { sessionId, userId } = useParams()
  const { session, sessionPoints, setSessionPoints } = useContext(
    SessionContext
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getSession () {
      try {
        setLoading(true)
        const res = await axios.get(`${url}/session/info/${sessionId}`)
        setSessionPoints(res.data.session.points)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const easyWord = randomWords({
    exactly: 1,
    maxLength: 4,
    formatter: (word, index) => {
      return index === 0
        ? word
            .slice(0, 1)
            .toUpperCase()
            .concat(word.slice(1))
        : word
    }
  })

  const mediumWord = randomWords({
    exactly: 1,
    maxLength: 7,
    formatter: (word, index) => {
      return index === 0
        ? word
            .slice(0, 1)
            .toUpperCase()
            .concat(word.slice(1))
        : word
    }
  })

  const hardWord = randomWords({
    exactly: 1,
    maxLength: 10,
    formatter: (word, index) => {
      return index === 0
        ? word
            .slice(0, 1)
            .toUpperCase()
            .concat(word.slice(1))
        : word
    }
  })

  const selectWord = async (word, difficulty) => {
    try {
      setLoading(true)
      handleWord({ word, difficulty })
      const selectedWord = word[0]
      await axios.post(`${url}/session/saveWord`, {
        selectedWord,
        difficulty,
        sessionId
      })
      setLoading(false)
      navigate(`/session/${sessionId}/${userId}`)
    } catch (error) {
      console.error(error)
    }
  }

  if (!loading) {
    return (
      <>
        <div className='text-center'>
          <Username />
          <SessionPoints />
        </div>
        {sessionPoints === 0 && (
          <div className='share__container'>
            Share this code to your friend to join the game: {session}
            <Button
              className='share__button btn-light'
              onClick={() => navigator.clipboard.writeText(session)}
            >
              Copy
            </Button>
          </div>
        )}

        <div className='choose__container'>
          <h2>Please choose a word:</h2>
          <Button
            className='form__submit btn-success'
            type='submit'
            onClick={() => selectWord(easyWord, 'easy')}
          >
            Easy: {easyWord}
          </Button>

          <Button
            className='form__submit btn-warning'
            type='submit'
            onClick={() => selectWord(mediumWord, 'medium')}
          >
            Medium: {mediumWord}
          </Button>

          <Button
            className='form__submit btn-danger'
            type='submit'
            onClick={() => selectWord(hardWord, 'hard')}
          >
            Hard: {hardWord}
          </Button>
        </div>
      </>
    )
  } else {
    return <Loading />
  }
}
