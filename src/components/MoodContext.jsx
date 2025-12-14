import { createContext, useContext } from 'react'

// Creates a place to store mood data.
export const MoodContext = createContext(undefined)

// Custom hook for accessing MoodContext.
export const useMoodContext = () => {
  // Reads data from MoodContext.
  const context = useContext(MoodContext)

  // Throws an error if the hook is used outside its provider.
  if (!context) {
    throw new Error('useMoodContext must be used in a MoodContext Provider')
  }

  return context
}
