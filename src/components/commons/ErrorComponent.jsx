import React, { Component } from 'react'
import monsterImage from '../../assets/notFoundMonster.gif'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true
    }
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className='notFound__container'>
          <h1>Houston, we have a problem</h1>
          <p className='notFound__subtitle'>
            We know it's scary but the page you're trying to reach is not
            working for the moment.
            <span className='notFound__subtitle--crossed'>link</span> dream?
          </p>
          <img src={monsterImage} alt='Monster' />
        </div>
      )
    }
    return this.props.children
  }
}
