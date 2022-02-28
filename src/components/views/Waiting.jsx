import React, { useContext } from 'react'
import guessingImage from '../../assets/guessing.gif'
import SessionContext from '../../context/SessionContext'

function Waiting () {
  const { userLogin } = useContext(SessionContext)

  return (
    <div className='notFound__container'>
      <h1 className='waiting__title'>
        Your friend is working, just wait and relax {userLogin}...
      </h1>
      <h5 className='notFound__subtitle'>Please DON'T refresh the page</h5>
      <img src={guessingImage} alt='Guessing' />
    </div>
  )
}

export default Waiting
