import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import PropTypes from 'prop-types'
import { loginUser } from '../services/userService'


function Login({ setRegisterAllow }) {


  const handleLogout = () => {
    // statement
  }


  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('email not')
          .required('required'),
        password: Yup.string()
          .min(4, '4 character')
          .required('required')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {

          const { email, password } = values
          const user = { email, password }

          axios
            .post("http://localhost:5000/api/auth/login", {
              user
            })
            .then((response) => {
              console.log("response", response);
              localStorage.setItem(
                "login",
                JSON.stringify({
                  userLogin: true,
                  token: response.data.access_token,
                })
              );
            })
            .catch(err => console.log(err))

          alert(JSON.stringify(values.null, 2));
          resetForm();
          setSubmitting(false)
        }, 400)
      }}
    >
      <Form>

        {/* Email */}
        <label htmlFor='email'>email</label>
        <Field name='email' type='email' />
        <ErrorMessage name='email' />

        {/* Password */}
        <label htmlFor='password'>password</label>
        <Field name='password' type='password' />
        <ErrorMessage name='password' />

        {/* Button */}
        <button type='submit'>submit</button>

        {/* Go To Register */}
        <p> go to <a onClick={() => setRegisterAllow(true)}>register</a></p>

        {/* Go To Logout */}
        <p> go to <a onClick={handleLogout}>logout</a></p>

      </Form>
    </Formik>
  )
}


Login.defaultProps = {
  setRegisterAllow: PropTypes.false
}

Login.PropTypes = {
  setRegisterAllow: PropTypes.bool
}


export default Login

