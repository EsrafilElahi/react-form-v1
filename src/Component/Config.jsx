import axios from 'axios'

export const sendRegister = user => {
  return axios.post(
    'https://jsonplaceholder.typicode.com/posts/',
    JSON.stringify(user)
  )
}

export const sendLogin = user => {
  return axios.post(
    'https://jsonplaceholder.typicode.com/posts/',
    JSON.stringify(user)
  )
}
