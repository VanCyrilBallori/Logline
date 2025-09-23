// app/hooks/useJournals.js
import { useContext } from 'react'
import { JournalsContext } from '../context/JournalsContext'

export function useJournals() {
  const context = useContext(JournalsContext)
  
  if (!context) {
    throw new Error('useJournals must be used within a JournalsProvider')
  }

  const { 
    journals, 
    allJournals,
    fetchJournals, 
    createJournal, 
    updateJournal, 
    deleteJournal,
    searchJournals,
    filterByTag,
    clearFilters,
    getAllTags,
    searchQuery,
    selectedTag
  } = context

  return {
    journals,
    allJournals,
    fetchJournals,
    createJournal,
    updateJournal,
    deleteJournal,
    searchJournals,
    filterByTag,
    clearFilters,
    getAllTags,
    searchQuery,
    selectedTag
  }
}

// Default export to fix Expo Router warnings
export default useJournals
