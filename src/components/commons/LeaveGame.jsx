import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const LeaveGame = () => {
  const { sessionId } = useParams()
  const navigate = useNavigate()

  const closeSession = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once you left, you will not be able to recover this session!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(leaveSession => {
      if (leaveSession) {
        axios
          .put(`http://localhost:8000/session/endSession/${sessionId}`)
          .then(() => {
            navigate(`/`)
          })
      }
    })
  }

  return (
    <>
      <Button
        className='btn-danger drawing__button--leave'
        type='submit'
        onClick={closeSession}
      >
        Leave Game
      </Button>
    </>
  )
}

export default LeaveGame
