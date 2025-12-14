import { useEffect, useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useMoodContext } from './MoodContext'
import { MoodOptions } from './MoodOptions'

function MoodForm() {
  // Local state for mood, emotions, and notes fields.
  const [mood, setMood] = useState('')
  const [emotions, setEmotions] = useState('')
  const [notes, setNotes] = useState('')

  // Context action for adding mood entries.
  const { addMood } = useMoodContext()
  // Reference for focusing the mood field after the first render.
  const moodInputRef = useRef(null)
  
  useEffect(() => {
    // Focuses on the mood selection field.
    moodInputRef?.current?.focus()
  }, [])

  // Handles form submission.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!mood) return // Prevents empty mood submission.

    addMood(mood, emotions, notes) // Creates a new mood entry.
    setMood('')
    setEmotions('')
    setNotes('')
  }

  return (
    <Box
      sx={{
        display: 'flex', // Flex layout.
        alignItems: 'center', // Centers items horizontally.
        flexDirection: 'column', // Arranges items vertically.
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: '40px', // Adds space above the form.
          display: 'flex',
          flexDirection: 'column',
          gap: '10px', // Adds space between items.
          width: '300px',  // Fixed width.
        }}
      >
        {/* Select field for choosing mood */}
        <label htmlFor='mood' style={{ color: '#8b1eb6ff' }}>
          Mood
        </label>
        <select
          id='mood'
          value={mood}
          ref={moodInputRef}
          // Handles mood selection.
          onChange={(e) => setMood(e.target.value)}
          style={{
            padding: '8px 12px', // Adds space inside borders.
            borderRadius: '8px',  // Rounds corners.
            border: '1px solid #b39ddb',
            color: '#8a4fffff',
          }}
        >
          {/* Default placeholder option */}
          <option value=''>Select mood…</option>
          {/* Renders all available mood options */}
          {MoodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Emotions input field */}
        <label htmlFor='emotions' style={{ color: '#8b1eb6ff' }}>
          Emotions (comma-separated)
        </label>
        <input
          id='emotions'
          type='text'
          value={emotions}
          // Handles emotions input.
          onChange={(e) => setEmotions(e.target.value)}
          // Placeholder with example emotions.
          placeholder='e.g., optimistic, fulfilled, grateful'
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #b39ddbff',
          }}
        />

        {/* Notes input field */}
        <label htmlFor='notes' style={{ color: '#8b1eb6ff' }}>
          Notes (optional)
        </label>
        <textarea
          id='notes'
          value={notes}
          // Handles notes input.
          onChange={(e) => setNotes(e.target.value)}
          rows={3} // Makes the textarea taller.
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #b39ddbff',
          }}
        />

        {/* Submit button */}
        <Button
          type='submit'
          variant='contained'
          sx={{
            marginTop: '10px',
            backgroundColor: '#cf6ff5ff',
          }}
        >
          Add Mood Entry
        </Button>
      </form>
    </Box>
  )
}

export default MoodForm
