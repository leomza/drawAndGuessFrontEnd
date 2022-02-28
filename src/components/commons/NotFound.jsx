import React from 'react'
import { useNavigate } from 'react-router-dom'
import monsterImage from '../../assets/notFoundMonster.gif'
import { Button } from 'react-bootstrap'

export default function NotFound () {
  const navigate = useNavigate()

  return (
    <div className='notFound__container'>
      <h1>Hello?? Is somebody there?</h1>
      <p className='notFound__subtitle'>
        We know it's scary but the page you're trying to reach can't be found.
        Perhaps it was just a bad
        <span className='notFound__subtitle--crossed'>link</span> dream?
      </p>
      <img src={monsterImage} alt='Monster' />
      <Button
        className='notFound__button btn-warning'
        type='submit'
        onClick={() => {
          navigate(`/`)
        }}
      >
        Redirect to Main Page
      </Button>
    </div>
  )
}
