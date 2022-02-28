import React, { useContext } from 'react'
import SessionContext from '../../context/SessionContext'

const SessionPoints = () => {
  const { sessionPoints } = useContext(SessionContext)

  return <h4>Winning points in session: {sessionPoints}</h4>
}

export default SessionPoints
