import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import * as Yup from 'yup'
import api from '../axiosConfig'

function RegisterForm() {
  // Navigation helper for redirects.
  const navigate = useNavigate()
  // Stores error message returned from the server.
  const [serverError, setServerError] = useState('')

  // Yup validation schema for form fields.
  const schema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/\d/, 'Password must contain at least one number')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  })

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 7, // Adds spacing.
        borderRadius: 4, // Rounds corners.
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)', // Adds shadow.
      }}
    >
      <Typography
        variant='h5'
        textAlign='center' // Centers the text.
        // Adds spacing and sets a bold font.
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Create Account
      </Typography>

      {/** Shows an error alert if a server error exists */}
      {serverError && <Alert severity='error'>{serverError}</Alert>}

      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schema}
        // Handles registration submission.
        onSubmit={async (values, { resetForm }) => {
          try {
            // Sends registration request.
            await api.post('/register', values)

            // Clears form fields.
            resetForm()

            // Shows success message.
            alert('Account created!')

            // Redirects to home page.
            navigate('/')
            // Handles registration errors.
          } catch (error) {
            const msg = error.response?.data?.error || 'Something went wrong'
            setServerError(msg)
          }
        }}
      >
        {/* Accesses Formik render-props (errors and touched) */}
        {({ errors, touched }) => {
          return (
            <Form>
              <Box
                sx={{
                  display: 'flex', // Flex layout.
                  flexDirection: 'column', // Arranges elements vertically.
                  gap: 1.5, // Adds spacing.
                  width: 390, // Fixed width.
                }}
                // Clears server error when user starts typing.
                onInput={() => setServerError('')}
              >
                {/* Email field */}
                <Field
                  as={TextField}
                  label='Email'
                  type='email'
                  name='email'
                  // Shows error state if the field was touched.
                  error={touched.email && Boolean(errors.email)}
                  helperText={
                    touched.email && errors.email ? errors.email : ' ' // Displays the error message.
                  }
                  // Keeps space under the field so the form does not shift.
                  FormHelperTextProps={{ sx: { minHeight: '20px' } }}
                />
                {/* Password field */}
                <Field
                  as={TextField}
                  label='Password'
                  type='password' // Hides the typed characters.
                  name='password'
                  error={touched.password && Boolean(errors.password)}
                  helperText={
                    touched.password && errors.password ? errors.password : ' '
                  }
                  FormHelperTextProps={{ sx: { minHeight: '20px' } }}
                />
                {/* Confirm Password field */}
                <Field
                  as={TextField}
                  label='Confirm Password'
                  type='password'
                  name='confirmPassword'
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ' '
                  }
                  FormHelperTextProps={{ sx: { minHeight: '20px' } }}
                />

                {/* Create Account button */}
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: '#b27befff',
                    paddingY: 1.6,
                    fontSize: '16px',
                    borderRadius: '14px',
                  }}
                >
                  Create Account
                </Button>
              </Box>

              {/* Redirects to login (home) page */}
              <Typography align='center' sx={{ mt: 3, color: '#5a5a5aff' }}>
                Already have an account?  <Link to='/'>Sign In</Link>
              </Typography>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}
export default RegisterForm
