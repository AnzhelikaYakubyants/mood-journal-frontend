import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useMoodContext } from './MoodContext'
import { MoodOptions } from './MoodOptions'

function Mood({ id, mood, emotions, notes, createdAt }) {
  // Local state for editing mood, emotions, and notes fields.
  const [editing, setEditing] = useState(false)
  const [editMood, setEditMood] = useState(mood)
  const [editEmotions, setEditEmotions] = useState(emotions)
  const [editNotes, setEditNotes] = useState(notes || '')

  // Context actions for updating/deleting mood entries.
  const { deleteMood, updateMood } = useMoodContext()
  // Navigation helper for redirects.
  const navigate = useNavigate()

  // Handles saving edited fields and triggers mood entry update.
  const handleSave = (e) => {
    e.preventDefault()
    updateMood(id, {
      mood: editMood,
      emotions: editEmotions,
      notes: editNotes,
    })
    // Exits editing.
    setEditing(false)
  }

  return (
    <div
      style={{
        display: 'flex', // Flex layout.
        flexDirection: 'column', // Arranges items vertically.
        gap: '9px', // Adds space between items.
        wordBreak: 'break-word', // Prevents long words from extending past the container borders.
        lineHeight: '1.5', // Adds extra spacing in text for better readability.
      }}
    >
      {/* Shows the edit form when editing */}
      {editing ? (
        <form
          onSubmit={handleSave}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {/* Mood selection field in editing mode */}
          <select
            value={editMood}
            // Updates the selected mood.
            onChange={(e) => setEditMood(e.target.value)}
            style={{
              padding: '10px', // Adds space inside borders.
              borderRadius: '8px', // Rounds corners.
              border: '2px solid #d7c8ffff',
            }}
          >
            {/* Renders all available mood options */}
            {MoodOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Emotions field in editing mode */}
          <input
            value={editEmotions}
            // Updates the emotions input.
            onChange={(e) => setEditEmotions(e.target.value)}
            placeholder='Emotions'
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '2px solid #d7c8ffff',
            }}
          />
          {/* Notes field in editing mode */}
          <textarea
            value={editNotes}
            // Updates the notes input.
            onChange={(e) => setEditNotes(e.target.value)}
            rows={5} // Makes the textarea taller.
            placeholder='Notes'
            style={{
              padding: '14px',
              borderRadius: '8px',
              border: '2px solid #e1d6ffff',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', // Centers buttons horizontally.
              gap: '14px',
              marginTop: '10px', // Adds spacing above the buttons.
            }}
          >
            {/* Save button */}
            <Button
              type='submit'
              size='small'
              variant='contained'
              sx={{
                backgroundColor: '#935ffaff',
              }}
            >
              Save
            </Button>

            {/* Cancel button */}
            <Button
              type='button'
              size='small'
              variant='outlined'
              onClick={() => setEditing(false)} // Exits editing.
              sx={{
                color: '#8557e3ff',
                borderColor: '#c5a9fbff',
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          {/* Read-only view */}

          {/* Displays the selected mood */}
          <div>
            <strong>Mood:</strong> {mood}
          </div>
          {/* Displays emotions or a fallback message */}
          <div>
            <strong>Emotions:</strong> {emotions || 'Not specified'}
          </div>
          {/* Displays notes or a fallback message */}
          <div>
            <strong>Notes:</strong> {notes || 'No notes'}
          </div>
          {/* Displays the date */}
          <div>
            <strong>Date:</strong>{' '}
            {createdAt ? new Date(createdAt).toLocaleString() : ''}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            
            {/* Edit, Delete, and View buttons */}
            <Button
              variant='outlined'
              size='small'
              sx={{
                borderColor: '#b39ddb',
                color: '#6a1b9a',
                textTransform: 'none',
              }}
              // Enables editing.
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>

            <Button
              variant='outlined'
              size='small'
              sx={{
                borderColor: '#ef5350',
                color: '#c62828',
                textTransform: 'none',
              }}
              // Deletes the mood entry.
              onClick={() => deleteMood(id)}
            >
              Delete
            </Button>

            <Button
              variant='outlined'
              size='small'
              sx={{
                borderColor: '#8d97eaff',
                color: '#4050e7ff',
                textTransform: 'none',
              }}
              // Opens detailed page.
              onClick={() => navigate(`/moods/${id}`)}
            >
              View
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Mood
