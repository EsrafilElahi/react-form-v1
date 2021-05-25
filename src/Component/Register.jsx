import React, { useState, useRef } from 'react'
import { sendRegister } from './Config'
import { BrowserRouter, Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'

function Register ({ setRegisterAllow }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [policy, setPolicy] = useState()
  const [, forceUpdate] = useState()

  const reset = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        email: '!ایمیل نامعتبر است',
        min: '!از حد نصاب کمتره',
        required: '!فیلد مورد نظر الزامی میباشد'
      },

      element: message => <div style={{ color: 'red', fontSize: '15px' }}>{message}</div>
    })
  )

  const handleSubmit = async e => {
    e.preventDefault()
    const user = {
      username,
      email,
      password
    }

    try {
      if (validator.current.allValid()) {
        const { status } = await sendRegister(user)
        if (status === 201) {
          console.log({ status: status })
          localStorage.setItem('username', user.username)
          localStorage.setItem('email', user.email)
          localStorage.setItem('password', user.password)
          alert('a user succesfully created*')
          reset()
        }
      } else {
        validator.current.showMessages()
        forceUpdate(1)
      }
    } catch (ex) {
      alert('an error has accured!')
      console.log(ex)
    }
  }

  return (
    <div>
      <h1 className='title'>Sign Up</h1>

      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='user-div'>
            <label htmlFor='username'>
              username :
              <input
                type='text'
                name='username'
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                  validator.current.showMessageFor('username')
                }}
              />
              {validator.current.message(
                'username',
                username,
                'required|min:2'
              )}
            </label>
          </div>
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
                'required|min:5'
              )}
            </label>
          </div>
          <div className='policy-div'>
            <label htmlFor='policy'>
              accept the privacy and policy
              <input
                className='checkbox'
                type='checkbox'
                name='policy'
                value={policy}
                onChange={e => {
                  setPolicy(e.currentTarget.checked)
                  validator.current.showMessageFor('policy')
                }}
              />
              {validator.current.message('policy', policy, 'required')}
            </label>
          </div>
          <button className='btn' type='submit'>
            sign up
          </button>
          <div className='have-account-div'>
            <label htmlFor='account'>
              already have an account ?{' '}
              <a onClick={() => setRegisterAllow(false)}>Login here</a>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
