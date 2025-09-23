// app/journals/edit.jsx
import { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, Pressable, Keyboard, View, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useJournals } from '../hooks/useJournals'
import { theme } from '../constants/theme'

const EditJournal = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { allJournals, updateJournal } = useJournals()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id || !allJournals) return
    const journal = allJournals.find((item) => item.id === id)
    if (journal) {
      setTitle(journal.title ?? '')
      setContent(journal.content ?? '')
      setTags(journal.tags ? journal.tags.join(', ') : '')
    }
  }, [id, allJournals])

  const handleUpdate = async () => {
    if (!title.trim()) {
      setError('Please enter a journal title')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Parse tags from comma-separated string
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      await updateJournal(id, { 
        title: title.trim(),
        content: content.trim(),
        tags: tagsArray
      })
      
    Keyboard.dismiss()
    router.push('/journals')
    } catch (err) {
      setError(err.message || 'Failed to update journal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
      <Text style={styles.title}>Edit Journal</Text>
            <Text style={styles.subtitle}>Update your thoughts</Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Journal Title</Text>
      <TextInput
                style={styles.titleInput}
                placeholder="Enter a title for your journal"
                placeholderTextColor={theme.colors.input.placeholder}
        value={title}
        onChangeText={setTitle}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Content</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="What's on your mind? Write your thoughts here..."
                placeholderTextColor={theme.colors.input.placeholder}
                value={content}
                onChangeText={setContent}
                editable={!loading}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tags (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="work, personal, ideas (comma-separated)"
                placeholderTextColor={theme.colors.input.placeholder}
                value={tags}
                onChangeText={setTags}
                editable={!loading}
              />
            </View>

            <Pressable 
              onPress={handleUpdate} 
              style={[styles.button, loading && styles.buttonDisabled]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Updating...' : 'Update Journal'}
              </Text>
      </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EditJournal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.heading,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.text.error,
  },
  errorText: {
    color: theme.colors.text.error,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: theme.spacing.xl,
  },
  inputLabel: {
    ...theme.typography.secondary,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.input.background,
    color: theme.colors.input.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  titleInput: {
    backgroundColor: theme.colors.input.background,
    color: theme.colors.input.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  contentInput: {
    backgroundColor: theme.colors.input.background,
    color: theme.colors.input.text,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    minHeight: 150,
  },
  button: {
    backgroundColor: theme.colors.button.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.card,
  },
  buttonText: {
    ...theme.typography.button,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.button.primaryDisabled,
  },
})
