import React from 'react'
import { Link } from 'react-router-dom'

const RedirectToMain = () => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
      <h3>You have already logged in, please go to the
        <Link to='/home'> main page</Link> directly</h3>
    </div>
  )
}

export default RedirectToMain