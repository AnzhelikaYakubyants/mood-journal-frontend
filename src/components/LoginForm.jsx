import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import api from '../axiosConfig'

function LoginForm() {
  // Navigation helper for redirects.
  const navigate = useNavigate()
  // Stores email error message returned from the server.
  const [emailError, setEmailError] = useState('')
  // Stores password error message returned from the server.
  const [passwordError, setPasswordError] = useState('')
  // Yup validation schema for form fields.
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      // Handles form submission.
      onSubmit={async (values) => {
        try {
          // Sends login request.
          const res = await api.post('/login', values)

          // Extracts token.
          const token = res.data.token

          // If login succeeded (token exists):
          if (token) {
            // Saves token to localStorage.
            localStorage.setItem('token', token)
            // Redirects user to moods page.
            navigate('/moods')
          }
          // Handles login errors.
        } catch (error) {
          const msg = error.response?.data?.error || 'Something went wrong'
          // If the server error indicates that the user does not exist,
          // shows the message under the Email field.
          if (msg.toLowerCase().includes('user')) {
            setEmailError(msg)
            setPasswordError('')
          } else {
            // Otherwise (incorrect password),
            // shows the message under the Password field.
            setPasswordError(msg)
            setEmailError('')
          }
        }
      }}
    >
      {/* Formik render props */}
      {({ touched, errors, handleChange }) => {
        return (
          <Form>
            <Box
              sx={{
                display: 'flex', // Flex layout.
                flexDirection: 'column', // Arranges elements vertically.
                width: 300, // Fixed width.
                gap: 0.5, // Adds spacing.
              }}
            >
              {/* Email field */}
              <Field
                as={TextField}
                required // Makes the field mandatory.
                type='email'
                label='Email'
                name='email'
                // Shows error state when an error exists.
                error={
                  Boolean(emailError) ||
                  (touched.email && Boolean(errors.email))
                }
                // Displays the error message or reserves space.
                helperText={
                  emailError ||
                  (touched.email && errors.email ? errors.email : ' ')
                }
                // Clears the server error message when the user starts typing.
                onChange={(e) => {
                  setEmailError('')
                  handleChange(e)
                }}
                // Keeps space under the field so the form does not shift.
                FormHelperTextProps={{ sx: { minHeight: '20px' } }}
                // Makes input field white color.
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: 'white',
                  },
                }}
              />
              {/* Password field */}
              <Field
                as={TextField}
                required
                label='Password'
                type='password' // Hides the typed characters.
                name='password'
                error={
                  Boolean(passwordError) ||
                  (touched.password && Boolean(errors.password))
                }
                helperText={
                  passwordError ||
                  (touched.password && errors.password ? errors.password : ' ')
                }
                onChange={(e) => {
                  setPasswordError('')
                  handleChange(e)
                }}
                FormHelperTextProps={{ sx: { minHeight: '20px' } }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: 'white',
                  },
                }}
              />
              {/* Login button */}
              <Button
                type='submit'
                variant='contained'
                sx={{
                  backgroundColor: '#8a4fffff',
                }}
              >
                Login
              </Button>

              {/* Redirects to registration */}
              <Typography align='center' sx={{ mt: 1, color: '#5a5a5aff' }}>
                Don't have an account? <Link to='/register'>Sign Up</Link>
              </Typography>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}
export default LoginForm
