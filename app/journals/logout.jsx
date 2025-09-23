// app/journals/logout.jsx
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'expo-router'

const Logout = () => {
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout()
        router.replace('/login')
      } catch (error) {
        console.error('Logout failed:', error)
        // Still redirect to login even if logout fails
        router.replace('/login')
      }
    }

    handleLogout()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
  },
})

export default Logout
