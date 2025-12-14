import { useEffect, useState } from 'react'
import { Box, Snackbar, Alert } from '@mui/material'
import { LogoutButton, MoodContext, MoodForm, MoodList } from '../components'
import api from '../axiosConfig'

function MoodsPage() {
  // Stores all mood entries.
  const [moods, setMoods] = useState([])
  // Controls the notification alert (visibility, message, and severity).
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  // Retrieves all user mood entries from the backend API.
  async function getMoods() {
    try {
      const response = await api.get('/moods')

      setMoods(response.data) // Updates state with the loaded mood entries.
    } catch (error) {
      // Logs the error.
      console.error('Error loading moods:', error)
    }
  }

  // Creates a new mood entry through the backend API.
  async function addMood(mood, emotions, notes) {
    try {
      await api.post('/moods', { mood, emotions, notes })

      // Shows a success notification after creating a mood entry.
      showAlert('Successfully created mood entry!', 'success')
      getMoods() // Refreshes the mood list after creation.
    } catch (error) {
      console.error('Error creating mood:', error)
      // Shows an error notification.
      showAlert('Error creating mood entry', 'error')
    }
  }

  // Deletes a mood entry by ID.
  async function deleteMood(id) {
    try {
      await api.delete(`/moods/${id}`)

      // Shows a success notification after deleting a mood entry.
      showAlert('Mood entry deleted!', 'success')
      getMoods() // Refreshes the mood list after deletion.
    } catch (error) {
      console.error('Error deleting mood:', error)
      showAlert('Error deleting mood entry', 'error')
    }
  }

  // Updates an existing mood entry.
  async function updateMood(id, fields) {
    try {
      await api.put(`/moods/${id}`, fields)

      // Shows a success notification after updating a mood entry.
      showAlert('Mood entry updated!', 'success')
      getMoods() // Refreshes the mood list after updating.
    } catch (error) {
      console.error('Error updating mood:', error)
      showAlert('Error updating mood entry', 'error')
    }
  }

  // Shows a notification alert.
  function showAlert(message, severity = 'success') {
    setAlert({ open: true, message, severity })
  }

  // Closes the alert.
  function handleCloseAlert() {
    setAlert(prev => ({ ...prev, open: false }))
  }

  // Loads mood entries after the first render.
  useEffect(() => {
      getMoods()
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh', // Covers the entire screen height.
        backgroundImage: `
    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 60%),
    linear-gradient(135deg, #fbf5c1ff, #fcb69f, #faccf8ff)`,
        paddingY: 4, // Adds vertical padding (top and bottom).
      }}
    >
      {/* Log out button */}
      <LogoutButton />

      {/* Page title */}
      <h2
        style={{
          fontFamily: 'Pacifico, cursive', // Pacifico handwritten font.
          fontSize: '38px',
          textAlign: 'center', // Centers the text.
          color: '#bd678cff',
          marginTop: '20px', // Adds spacing above.
        }}
      >
        Mood Journal
      </h2>

      {/* Provides mood data and CRUD actions */}
      <MoodContext.Provider
        value={{
          moods,
          addMood,
          deleteMood,
          updateMood,
        }}
      >
        <Box sx={{ mb: 6 }}>
          {/* Displays the mood form */}
          <MoodForm />
        </Box>
        {/* Displays the list of saved mood entries */}
        <MoodList />
      </MoodContext.Provider>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000} // Auto closes after 3 seconds.
        onClose={handleCloseAlert} // Handles closing the alert.
        // Positions the Snackbar (notification) on the screen.
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {/* Alert message */}
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MoodsPage
