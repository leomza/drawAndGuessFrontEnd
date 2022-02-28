import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'
import Waiting from './Waiting'
import LeaveGame from '../commons/LeaveGame'
import { url } from '../../config'

function Guessing () {
  const navigate = useNavigate()
  const { sessionId, userId } = useParams()
  const [image, setImage] = useState(null)
  const [word, setWord] = useState('')
  const [guessingword, setGuessingword] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      getSessionInfo(sessionId)
      getImage()
    }, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getImage = async () => {
    try {
      const res = await axios.get(
        `${url}/session/info/${sessionId}`
      )
      setImage(res.data.session.image)
      setWord(res.data.session.word)
    } catch (error) {
      console.error(error)
    }
  }

  const getSessionInfo = async userId => {
    const res = await axios.get(`${url}/session/info/${userId}`)
    if (res.data.session.finishedDate) {
      swal('The session is over, your friend left! 😒').then(() => {
        navigate(`/`)
      })
    }
  }

  const onChange = e => {
    try {
      setGuessingword(e.target.value)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async e => {
    try {
      e.preventDefault()
      if (guessingword.toLowerCase() === word.toLowerCase()) {
        swal('Great!', 'Now is time to draw', 'success')
        const resSession = await axios.put(
          `${url}/session/guessSuccess/${sessionId}`
        )
        const usersInSession = resSession.data.session.users
        await axios.put(`${url}/user/changeRoles`, {
          usersInSession
        })
        navigate(`/word/${sessionId}/${userId}`)
      } else {
        swal('Oh no!', 'Wrong answer', 'error')
      }
    } catch (error) {
      if (error.response.data.message) {
        swal('Oh no!', error.response.data.message, 'error')
      } else if (!error.response.data.message && error.response.data) {
        swal('Oh no!', error.response.data, 'error')
      }
      console.error(error)
    }
  }

  if (image) {
    return (
      <>
        <div className='drawing__container'>
          <h1>Time to guess! </h1>
          <img className='guessing' src={image} alt='Draw from your friend' />
          <Form className='form__container' onSubmit={onSubmit}>
            <Form.Control
              type='text'
              name='guessWord'
              onChange={onChange}
              autoComplete='off'
              placeholder='What is drawing?'
            />
            <Button className='form__submit' type='submit' onClick={onSubmit}>
              Enter
            </Button>
          </Form>
        </div>
        <div className='drawing__button--container-leave'>
          <LeaveGame />
        </div>
      </>
    )
  } else {
    return <Waiting />
  }
}

export default Guessing
