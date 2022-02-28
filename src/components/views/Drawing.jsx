import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import SignaturePad from 'react-signature-canvas'
import axios from 'axios'
import swal from 'sweetalert'
import { useParams, useNavigate } from 'react-router-dom'
import Waiting from './Waiting'
import LeaveGame from '../commons/LeaveGame'

function Drawing ({ chooseWord }) {
  const sigCanvas = useRef({})
  const navigate = useNavigate()
  const { sessionId, userId } = useParams()
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      getSessionInfo(sessionId)
      getUserInfo(userId)
    }, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserInfo = async userId => {
    const res = await axios.get(`http://localhost:8000/user/info/${userId}`)
    if (!res.data.user.drawer) {
      navigate(`/guessing/${sessionId}/${userId}`)
    }
  }

  const getSessionInfo = async userId => {
    const res = await axios.get(`http://localhost:8000/session/info/${userId}`)
    if (res.data.session.finishedDate) {
      swal('The session is over, your friend left! 😒').then(() => {
        navigate(`/`)
      })
    }
  }

  const clear = () => {
    sigCanvas.current.clear()
  }

  const save = async () => {
    const imageURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    await axios.post('http://localhost:8000/session/saveImage', {
      imageURL,
      sessionId
    })
    setWaiting(true)
  }

  if (!waiting) {
    return (
      <>
        <div className='drawing__container'>
          <h1>Time to draw! </h1>
          <p>Your word is: {chooseWord.word}</p>
          <div className='drawing'>
            <SignaturePad
              canvasProps={{
                width: 300,
                height: 300,
                className: 'sigCanvas',
                throttle: 50
              }}
              ref={sigCanvas}
            />
          </div>
        </div>
        <div className='drawing__button__container'>
          <Button className='btn-danger' onClick={clear}>
            Clear
          </Button>
          <Button className='btn-success' onClick={save}>
            Send
          </Button>
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

export default Drawing
