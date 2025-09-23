import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import { useTheme } from "./context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.replace("/journals"); // redirect to journals feed
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const styles = getStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Logline</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.input.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.input.placeholder}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable
              onPress={() => router.push("/signup")}
              disabled={loading}
            >
              <Text style={styles.linkText}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: theme.spacing.xl,
    },
    header: {
      alignItems: "center",
      marginBottom: theme.spacing.xl,
    },
    title: {
      ...theme.typography.heading,
      marginBottom: theme.spacing.sm,
      color: theme.colors.text.primary,
    },
    subtitle: {
      ...theme.typography.secondary,
      fontSize: 16,
      color: theme.colors.text.secondary,
    },
    form: {
      width: "100%",
    },
    errorContainer: {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.text.error,
    },
    errorText: {
      color: theme.colors.text.error,
      textAlign: "center",
      fontSize: 14,
      fontWeight: "500",
    },
    inputContainer: {
      marginBottom: theme.spacing.lg,
    },
    inputLabel: {
      ...theme.typography.secondary,
      marginBottom: theme.spacing.sm,
      fontWeight: "500",
      color: theme.colors.text.primary,
    },
    input: {
      backgroundColor: theme.colors.input.background,
      color: theme.colors.input.text,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "transparent",
    },
    button: {
      backgroundColor: theme.colors.button.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      marginTop: theme.spacing.lg,
      ...theme.shadows.card,
    },
    buttonText: {
      ...theme.typography.button,
      textAlign: "center",
      color: theme.colors.button.text,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.button.primaryDisabled,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing.xl,
    },
    footerText: {
      ...theme.typography.secondary,
      color: theme.colors.text.secondary,
    },
    linkText: {
      ...theme.typography.secondary,
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
