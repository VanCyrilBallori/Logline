import { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "./context/AuthContext"
import { theme } from "./constants/theme"

export default function Index() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only navigate after auth loading is complete
    if (!loading) {
      if (user) {
        // If logged in, go to journals feed
        router.replace("/journals")
      } else {
        // If not logged in, go to login screen
        router.replace("/login")
      }
    }
  }, [user, loading])

  // Show loading screen while auth is being determined
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    )
  }

  return null // This should not render as we redirect above
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
})