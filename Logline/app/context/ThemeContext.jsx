import { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { themes } from '../constants/theme'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [theme, setTheme] = useState(themes.dark)

  // Load saved theme on app start
  useEffect(() => {
    loadTheme()
  }, [])

  // Update theme when currentTheme changes
  useEffect(() => {
    setTheme(themes[currentTheme])
  }, [currentTheme])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme')
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme)
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
  }

  const changeTheme = async (themeName) => {
    try {
      await AsyncStorage.setItem('selectedTheme', themeName)
      setCurrentTheme(themeName)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentTheme, 
      changeTheme,
      availableThemes: Object.keys(themes)
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
