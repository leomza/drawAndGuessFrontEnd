import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import pencilGif from '../../assets/pencilGif.gif'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import SessionContext from '../../context/SessionContext'
import Loading from '../commons/Loading'
import Error from '../commons/Error'
import { url } from '../../config'

const Welcome = () => {
  const navigate = useNavigate()
  const { setSession, setUserLogin } = useContext(SessionContext)
  const [user, setUser] = useState({ playerName: '', sessionId: '' })
  const [sessionExist, setSessionExist] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [highscore, setHighscore] = useState(0)

  const { playerName, sessionId } = user

  useEffect(() => {
    async function getSession () {
      try {
        setLoading(true)
        const res = await axios.get(`${url}/session/infoAll/`)
        maxScore(res.data.sessions)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const maxScore = sessions => {
    const maxValue = sessions.reduce(
      (acc, shot) => (acc = acc > shot.points ? acc : shot.points),
      0
    )
    setHighscore(maxValue)
  }

  const onChange = e => {
    try {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeChecked = e => {
    try {
      setSessionExist(e.target.checked)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async e => {
    try {
      e.preventDefault()
      if (user.playerName.trim() === '') {
        setError(true)
        return
      }
      setError(false)
      const res = await axios.post(
        `${url}/user/createUser`,
        user
      )
      setLoading(true)

      swal('👨‍🎨👩‍🎨', res.data.message).then(() => {
        setSession(res.data.sessionId)
        setUserLogin(res.data.user.playerName)
        setLoading(false)
        if (res.data.user.drawer) {
          navigate(`/word/${res.data.sessionId}/${res.data.user._id}`)
        } else {
          navigate(`/guessing/${res.data.sessionId}/${res.data.user._id}`)
        }
      })
    } catch (error) {
      if (error.response.data.message) {
        swal('Oh no!', error.response.data.message, 'error')
      } else if (!error.response.data.message && error.response.data) {
        swal('Oh no!', error.response.data, 'error')
      }
      console.error(error)
    }
  }

  if (!loading) {
    return (
      <>
        <div className='welcome__container'>
          <h1 className='welcome__title'>
            Welcome to Leonardos <br />
            Draw & Guess
          </h1>
          <img className='welcome__gif' src={pencilGif} alt='gif pencil' />
        </div>
        <h3 className='welcome__score'>
          Maximum score in the game: <br />
          <span className='welcome__score--number'>{highscore} points 🏆</span>
        </h3>
        <Form className='form__container' onSubmit={onSubmit}>
          <Form.Label htmlFor='playerName'>Please enter you name: </Form.Label>
          <Form.Control
            type='text'
            name='playerName'
            id='playerName'
            maxLength={20}
            value={playerName}
            onChange={onChange}
            autoComplete='off'
            placeholder='Name'
          />
          {error ? <Error message='Please complete your name' /> : null}

          <Form.Label htmlFor='sessionExist'>
            Friend is waiting for you? Check the box and enter the session ID
            that he gave you
          </Form.Label>
          <Form.Check
            className='form__checkbox'
            type='checkbox'
            value={sessionExist}
            onChange={onChangeChecked}
            name='sessionExist'
            id='sessionExist'
          />

          <Form.Control
            type='text'
            value={sessionId}
            onChange={onChange}
            name='sessionId'
            id='sessionId'
            autoComplete='off'
            disabled={sessionExist ? false : true}
            placeholder='Code'
          />
          <Button className='form__submit' type='submit'>
            Enter
          </Button>
        </Form>
      </>
    )
  } else {
    return <Loading />
  }
}

export default Welcome
