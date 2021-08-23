import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types'


function Register({ setRegisterAllow }) {

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        privacy: false
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'must be 15 character')
          .required('required'),
        lastName: Yup.string()
          .min(3, 'least 3 character')
          .required('required'),
        email: Yup.string()
          .email('not email')
          .required('required'),
        password: Yup.string()
          .min(4, '4 character')
          .required('required'),
        password2: Yup.string()
          .required('required')
          .oneOf([Yup.ref('password'), null], 'must be match'),
        privacy: Yup.boolean()
          .required('required')
          .oneOf([true], 'must be true')
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          const { firstName, lastName, email, password, password2, privacy } = values
          const user = { firstName, email, password }
          axios
            .post("http://localhost:5000/api/auth/register", {
              user
            })
            .then((response) => console.log("response", response))
            .catch((err) => console.log(err))
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 400)
      }}
    >

      <Form>

        {/* First Naem */}
        <label htmlFor='firstName'>first name</label>
        <Field name='firstName' type='text' />
        <ErrorMessage name='firstName' />

        {/* Last Name */}
        <label htmlFor='lastName'>last name</label>
        <Field name='lastName' type='text' />
        <ErrorMessage name='lastName' />

        {/* Email */}
        <label htmlFor='email'>email</label>
        <Field name='email' type='email' />
        <ErrorMessage name='email' />

        {/* Password */}
        <label htmlFor='password'>password</label>
        <Field name='password' type='password' />
        <ErrorMessage name='password' />

        {/* Password 2 */}
        <label htmlFor='password2'>password 2</label>
        <Field name='password2' type='password' />
        <ErrorMessage name='password2' />

        {/* Privacy */}
        <label htmlFor='privacy'>privacy</label>
        <Field name='privacy' type='checkbox' />
        <ErrorMessage name='privacy' />

        {/* Submit Button */}
        <button type='submit'>submit</button>

        {/* Go To Login */}
        <p> go to <a onClick={() => setRegisterAllow(false)}>login</a></p>

      </Form>

    </Formik>
  )
}


Register.PropTypes = {
  setRegisterAllow: PropTypes.bool
}

Register.defaultProps = {
  setRegisterAllow: PropTypes.true
}

export default Register
