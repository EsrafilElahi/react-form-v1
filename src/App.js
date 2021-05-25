import React,{useState} from 'react'
import Register from './Component/Register'
import Login from './Component/Login'


import './App.css'

function App () {
  const [registerAllow, setRegisterAllow] = useState(true)

  return (
    <div className='App'>
      {
        registerAllow ? <Register setRegisterAllow={setRegisterAllow} /> : <Login />
      }
    </div>
  )
}

export default App
