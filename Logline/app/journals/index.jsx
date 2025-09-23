// app/journals/index.jsx
import { View, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import JournalsFeed from './JournalsFeed'
import { theme } from '../constants/theme'

const JournalsHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Journals</Text>
        <Text style={styles.subtitle}>Your personal journal collection</Text>
      </View>
      
      <View style={styles.content}>
        <JournalsFeed />
      </View>

      <View style={styles.footer}>
        <Link style={styles.createButton} href="/journals/create">
          <Text style={styles.createButtonText}>+ New Journal</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  title: {
    ...theme.typography.heading,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.secondary,
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
  },
  createButton: {
    backgroundColor: theme.colors.button.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.card,
  },
  createButtonText: {
    ...theme.typography.button,
    fontSize: 18,
  },
})

export default JournalsHome
