import { Box } from '@mui/material'
import { RegisterForm } from '../components'

function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh', // Covers the entire screen height.
        display: 'flex', // Flex layout.
        alignItems: 'center', // Vertically centers the form.
        justifyContent: 'center', // Horizontally centers the form.
        // Gradient background.
        background: 'linear-gradient(135deg, #8ec5fcff, #e0c3fcff)',
      }}
    >
      {/* Renders the registration form component */}
      <RegisterForm />
    </Box>
  )
}
export default RegisterPage
