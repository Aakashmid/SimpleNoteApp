import React from 'react'
import Form from '../components/Form'

export default function Login() {
  return (
    <div className='login-container flex justify-center translate-y-1/2 w-full px-5'>
      <Form method={'login'} route={'/api/token/'}/>
    </div>
  )
}
