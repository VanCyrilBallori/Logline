// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../firebaseConfig.js"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Auth state changed:", currentUser ? "User logged in" : "User logged out")
        setUser(currentUser)
        setLoading(false)
      }, (error) => {
        console.error("Auth state change error:", error)
        setLoading(false)
      })
      return unsubscribe
    } catch (error) {
      console.error("Auth initialization error:", error)
      setLoading(false)
    }
  }, [])

  const signup = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      return await signOut(auth)
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// Default export to fix Expo Router warnings
export default AuthProvider