// app/hooks/useJournals.js
import { useContext } from 'react'
import { JournalsContext } from '../context/JournalsContext'

export function useJournals() {
  const context = useContext(JournalsContext)
  
  if (!context) {
    throw new Error('useJournals must be used within a JournalsProvider')
  }

  const { journals, fetchJournals, createJournal, updateJournal, deleteJournal } = context

  return {
    journals,
    fetchJournals,
    createJournal,
    updateJournal,
    deleteJournal,
  }
}
