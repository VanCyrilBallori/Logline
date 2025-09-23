import { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { themes, typography, spacing, borderRadius, shadows } from '../constants/theme'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [theme, setTheme] = useState({
    ...themes.dark,
    typography,
    spacing,
    borderRadius,
    shadows
  })

  // Load saved theme on app start
  useEffect(() => {
    loadTheme()
  }, [])

  // Update theme when currentTheme changes
  useEffect(() => {
    setTheme({
      ...themes[currentTheme],
      typography,
      spacing,
      borderRadius,
      shadows
    })
  }, [currentTheme])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme')
      console.log('Loaded theme from storage:', savedTheme)
      if (savedTheme && themes[savedTheme]) {
        console.log('Setting theme to:', savedTheme)
        setCurrentTheme(savedTheme)
      } else {
        console.log('No valid theme found, using default: dark')
      }
    } catch (error) {
      console.error('Error loading theme:', error)
    }
  }

  const changeTheme = async (themeName) => {
    try {
      console.log('Changing theme to:', themeName)
      await AsyncStorage.setItem('selectedTheme', themeName)
      setCurrentTheme(themeName)
      console.log('Theme changed successfully to:', themeName)
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

// Default export to fix Expo Router warnings
export default ThemeProvider
