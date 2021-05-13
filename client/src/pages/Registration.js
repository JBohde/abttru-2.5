import React from 'react'
import Logo from '../assets/abetterlogo3.png';

export default function Registration() {
  return (
    <div className="login-container">
    <div className='login-wrapper'>
      <img src={Logo} style={{ width: '150px', height: '150px' }} alt="A Better You logo"/>
      <h1>Registration</h1>
    </div>
  </div>
  )
}
