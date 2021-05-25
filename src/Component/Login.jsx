import React, { useState, useRef } from 'react'
import { sendLogin } from './Config'
import SimpleReactValidator from 'simple-react-validator'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, forceUpdate] = useState()

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: '!فیلد مورد نظر الزامی میباشد',
        email: '!ایمیل نامعتبر است',
        min: '!از حد نصاب کمتره'
      },

      element: message => <div style={{ color: 'red', fontSize:'15px' }}>{message}</div>
    })
  )

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    try {
      if (validator.current.allValid()) {
        const { status } = await sendLogin(user)
        if (status === 201) {
          alert('successfully intered *')
          reset()
        }
      } else {
        validator.current.showMessages()
        forceUpdate(1)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div>
      <h1 className='title'>login</h1>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='email-div'>
            <label htmlFor='email'>
              email :
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  validator.current.showMessageFor('email')
                }}
              />
              {validator.current.message('email', email, 'required|email')}
            </label>
          </div>
          <div className='password-div'>
            <label htmlFor='password'>
              password :
              <input
                type='password'
                name='password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  validator.current.showMessageFor('password')
                }}
              />
              {validator.current.message(
                'password',
                password,
                'required|min:6'
              )}
            </label>
          </div>
          <input type='submit' className='btn' value='login' />
        </form>
      </div>
    </div>
  )
}

export default Login
