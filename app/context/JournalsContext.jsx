import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore"
import { createContext, useState, useContext, useEffect } from "react"
import { db } from "../../firebaseConfig.js"
import { useAuth } from "./AuthContext"

export const JournalsContext = createContext()

export function JournalsProvider({ children }) {
  const [journals, setJournals] = useState([])
  const [filteredJournals, setFilteredJournals] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const { user } = useAuth()

  // Real-time fetch - only get journals for current user
  function fetchJournals() {
    if (!user) {
      setJournals([])
      return () => {}
    }

    const q = query(collection(db, "journals"), where("userId", "==", user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const journalsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setJournals(journalsList)
    })
    return unsubscribe
  }

  async function createJournal(journalData) {
    if (!user) {
      throw new Error("User must be logged in to create journals")
    }
    
    const journalWithUser = {
      title: journalData.title || '',
      content: journalData.content || '',
      tags: journalData.tags || [],
      userId: user.uid,
      createdAt: new Date().toISOString(),
    }
    
    await addDoc(collection(db, "journals"), journalWithUser)
  }

  async function deleteJournal(id) {
    if (!user) {
      throw new Error("User must be logged in to delete journals")
    }
    
    // Verify the journal belongs to the current user
    const journal = journals.find(j => j.id === id)
    if (!journal || journal.userId !== user.uid) {
      throw new Error("You can only delete your own journals")
    }
    
    await deleteDoc(doc(db, "journals", id))
  }

  async function updateJournal(id, updatedData) {
    if (!user) {
      throw new Error("User must be logged in to update journals")
    }
    
    // Verify the journal belongs to the current user
    const journal = journals.find(j => j.id === id)
    if (!journal || journal.userId !== user.uid) {
      throw new Error("You can only update your own journals")
    }
    
    const updateData = {
      title: updatedData.title || journal.title,
      content: updatedData.content || journal.content,
      tags: updatedData.tags || journal.tags || [],
      updatedAt: new Date().toISOString(),
    }
    
    await updateDoc(doc(db, "journals", id), updateData)
  }

  // Search and filter functions
  function searchJournals(query) {
    setSearchQuery(query)
  }

  function filterByTag(tag) {
    setSelectedTag(tag)
  }

  function clearFilters() {
    setSearchQuery('')
    setSelectedTag('')
  }

  // Get all unique tags from journals
  function getAllTags() {
    const allTags = journals.flatMap(journal => journal.tags || [])
    return [...new Set(allTags)].filter(tag => tag.trim() !== '')
  }

  // Apply filters to journals
  function applyFilters() {
    let filtered = [...journals]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(journal => 
        journal.title?.toLowerCase().includes(query) ||
        journal.content?.toLowerCase().includes(query)
      )
    }

    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter(journal => 
        journal.tags?.includes(selectedTag)
      )
    }

    setFilteredJournals(filtered)
  }

  // Update filtered journals when journals, search, or tag filter changes
  useEffect(() => {
    applyFilters()
  }, [journals, searchQuery, selectedTag])

  return (
    <JournalsContext.Provider
      value={{ 
        journals: filteredJournals, 
        allJournals: journals,
        fetchJournals, 
        createJournal, 
        deleteJournal, 
        updateJournal,
        searchJournals,
        filterByTag,
        clearFilters,
        getAllTags,
        searchQuery,
        selectedTag
      }}
    >
      {children}
    </JournalsContext.Provider>
  )
}

// Default export to fix Expo Router warnings
export default JournalsProvider
