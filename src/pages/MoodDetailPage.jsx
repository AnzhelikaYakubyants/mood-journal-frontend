import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material'
import api from '../axiosConfig'

function MoodDetailPage() {
  // Retrieves the mood ID from the URL.
  const { id } = useParams()
  // Stores the fetched mood entry.
  const [mood, setMood] = useState(null)

  useEffect(() => {
    // Fetches a single mood entry from the API.
    async function getMood() {
      try {
        // API CALL.
        const response = await api.get(`/moods/${id}`)
        // Updates state with fetched mood data.
        setMood(response.data)
        // Handles API errors.
      } catch (error) {
        console.error(error)
        setMood(null)
      }
    }
    getMood()
  }, [id])

  // Prevents rendering if mood data is not available.
  if (!mood) return null

  return (
    // Detail page with centered content and background styling.
    <Box
      sx={{
        display: 'flex', // Flex layout.
        justifyContent: 'center', // Centers content horizontally.
        alignItems: 'center', // Centers content vertically.
        minHeight: '100vh', // Sets a minimum height to fill the screen.
        backgroundImage: `
    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 60%),
    linear-gradient(135deg, #fbf5c1ff, #ffb8fbff) `,
      }}
    >
      <Container maxWidth='sm'>
        {/* Container for mood details */}
        <Box
          sx={{
            p: 4, // Adds padding to the container.
            borderRadius: 4, // Rounds the corners.
            backgroundColor: '#fff',
            boxShadow: 4, // Adds shadow.
          }}
        >
          {/* Page title */}
          <Typography
            variant='h5'
            sx={{
              textAlign: 'center', // Centers the text.
              fontWeight: 600, // Makes the text bold.
              color: '#bd678cff',
              mb: 5, // Bottom spacing.
            }}
          >
            Mood Entry Detail
          </Typography>

          {/* Displays the selected mood */}
          <Typography variant='body1' sx={{ mb: 2 }}>
            <strong>Mood:</strong> {mood.mood}
          </Typography>

          {/* Displays emotions or a fallback message */}
          <Typography variant='body1' sx={{ mb: 2 }}>
            <strong>Emotions:</strong> {mood.emotions || 'Not specified'}
          </Typography>

          {/* Displays notes or a fallback message */}
          <Typography variant='body1' sx={{ mb: 2 }}>
            <strong>Notes:</strong> {mood.notes || 'No notes'}
          </Typography>

          {/* Displays the date */}
          <Typography variant='body1'>
            <strong>Date:</strong> {new Date(mood.createdAt).toLocaleString()}
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            {/* Button to navigate back to the moods page */}
            <Button
              variant='contained'
              sx={{
                mt: 6, // Top spacing.
                px: 5, // Horizontal padding.
                fontWeight: 600,
                backgroundColor: '#b39ddb',
              }}
              component={Link}
              to='/moods'
            >
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default MoodDetailPage
