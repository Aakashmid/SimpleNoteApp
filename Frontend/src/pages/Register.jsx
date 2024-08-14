import React from 'react'
import Form from '../components/Form'

export default function Register() {
  return (
    <div className='register-container flex justify-center translate-y-1/2 w-full px-5'>
    <Form method={'register'} route={'/api/user/register'}/>
  </div>
  )
}
