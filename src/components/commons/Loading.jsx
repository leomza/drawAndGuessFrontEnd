import React from 'react'
import spinner from '../../assets/spinner.gif'

function Loading () {
  return (
    <div>
      <img className='loading__spinner' src={spinner} alt='Loading...' />
    </div>
  )
}

export default Loading
