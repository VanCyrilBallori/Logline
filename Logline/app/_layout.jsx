import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { JournalsProvider } from "./context/JournalsContext"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <JournalsProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="journals" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </JournalsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}