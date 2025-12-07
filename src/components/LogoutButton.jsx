import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  // Navigation helper for redirects.
  const navigate = useNavigate()

  // Logs the user out.
  const logout = () => {
    // Removes saved auth token.
    localStorage.removeItem('token')
    // Redirects to the home page.
    navigate('/')
  }
  
  return (
    // Logout button.
    <Button
      onClick={logout}
      sx={{
        // Positions the button in the top right corner.
        position: 'absolute',
        top: 30,
        right: 28,
        
        fontWeight: 600, // Makes the text bold.
        fontSize: '1rem',
        
        // Text and background colors.
        color: '#b865a9ff',
        backgroundColor: '#f0c7d3ff',
        
        padding: '4px 12px', // Adds spacing.
        borderRadius: '8px', // Rounds the corners.
        boxShadow: 1 // Adds shadow.
      }}
    >
      Logout
    </Button>
  )
}
export default LogoutButton
