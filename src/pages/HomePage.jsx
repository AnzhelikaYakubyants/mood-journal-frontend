import { Box, Stack, Typography } from '@mui/material'
import bgImage from '../assets/background.jpg'
import LoginForm from '../components/LoginForm'

function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh', // Sets a minimum height to fill the screen.
        background: 'linear-gradient(135deg, #f8cee3ff, #c7ccfdff)',
      }}
    >
      {/* Horizontal layout with vertically centered items */}
      <Stack direction='row' alignItems='center'>
        <Box padding={14}>
          {/* App title with emoji */}
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='h4'>🎭</Typography>
            <Typography
              variant='h4'
              fontWeight='medium' // Slightly emphasizes the text.
              sx={{ color: '#6a1b9aff' }}
            >
              Mood Journal
            </Typography>
          </Stack>

          {/* Welcome text and description */}
          <Stack marginY={4} spacing={2}>
            <Typography variant='h4' sx={{ color: '#6a1b9aff' }}>
              Welcome to <br />
              Mood & Emotional <br /> Wellness Tracker!
            </Typography>

            <Typography variant='h6' sx={{ color: '#283593ff' }}>
              Track your mood. <br />
              Understand your emotions.
            </Typography>

            <Typography variant='subtitle1' color='primary'>
              Built by Anzhelika Yakubyants
            </Typography>
          </Stack>

          {/* Login form */}
          <LoginForm />
        </Box>

        {/* Image on the right side of the screen */}
        <Box
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flex: 1, // Allows the container to expand and fill available space.
            minHeight: '60vh', // Sets a minimum height for the image container.
            margin: 12, // Adds outer spacing around the image container.
            borderRadius: 8, // Rounds the corners.
          }}
        />
      </Stack>
    </Box>
  )
}

export default HomePage
