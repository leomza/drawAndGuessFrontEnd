import React, { useContext } from 'react'
import SessionContext from '../../context/SessionContext'

const Username = () => {
  const { userLogin } = useContext(SessionContext)

  return <p>Wish you all the best {userLogin}!</p>
}

export default Username
