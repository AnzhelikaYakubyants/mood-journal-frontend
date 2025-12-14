import { Box, Typography, Stack } from '@mui/material'
import { useMoodContext } from './MoodContext'
import Mood from './Mood'

function MoodList() {
  // Gets mood data from context.
  const { moods } = useMoodContext()

  return (
    <Box>
      <h2
        style={{
          textAlign: 'center', // Centers the text.
          color: '#bd678cff',
        }}
      >
        Mood History
      </h2>

      {/* Renders list if moods exist */}
      {moods.length > 0 ? (
        <Stack spacing={2} alignItems='center'>
          {moods.map((mood) => (
            <Box
              // Unique key for each mood entry.
              key={mood.id}
              sx={{
                width: '100%', // Stretches full width.
                maxWidth: 600, // Prevents it from becoming too wide.
                p: 3, // Adds space inside borders.
                borderRadius: 3, // Rounds corners.
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
              }}
            >
              {/* Renders a mood entry */}
              <Mood {...mood} />
            </Box>
          ))}
          {/* Displays total count of mood entries */}
          <Typography align='center' sx={{ mt: 3, color: '#8b1eb6ff' }}>
            There are {moods.length} mood entries in the list.
          </Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'flex', // Flex layout.
            justifyContent: 'center', // Centers the text horizontally.
          }}
        >
          <Typography variant='h6' sx={{ mt: 3, color: '#8b1eb6ff' }}>
            No mood entries to display!
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default MoodList
