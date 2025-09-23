import { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { JournalsContext } from '../context/JournalsContext'
import { useRouter } from 'expo-router'
import { theme } from '../constants/theme'

const JournalsFeed = () => {
  const { 
    journals, 
    allJournals,
    fetchJournals, 
    deleteJournal, 
    searchJournals, 
    filterByTag, 
    clearFilters, 
    getAllTags,
    searchQuery,
    selectedTag
  } = useContext(JournalsContext)
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const unsubscribe = fetchJournals()
    return () => { if (typeof unsubscribe === 'function') unsubscribe() }
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteJournal(id)
    } catch (error) {
      console.error('Failed to delete journal:', error)
      // You could add a toast notification here
    }
  }

  const availableTags = getAllTags()

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search journals..."
          placeholderTextColor={theme.colors.input.placeholder}
          value={searchQuery}
          onChangeText={searchJournals}
        />
        <Pressable 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
      </View>

      {/* Filter Section */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={[styles.tagButton, !selectedTag && styles.tagButtonActive]}
              onPress={clearFilters}
            >
              <Text style={[styles.tagButtonText, !selectedTag && styles.tagButtonTextActive]}>
                All
              </Text>
            </Pressable>
            {availableTags.map((tag) => (
              <Pressable
                key={tag}
                style={[styles.tagButton, selectedTag === tag && styles.tagButtonActive]}
                onPress={() => filterByTag(tag)}
              >
                <Text style={[styles.tagButtonText, selectedTag === tag && styles.tagButtonTextActive]}>
                  {tag}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Journals List */}
      {journals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            {allJournals.length === 0 ? 'No journals yet' : 'No journals found'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {allJournals.length === 0 
              ? 'Create your first journal to get started' 
              : 'Try adjusting your search or filters'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={journals}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.journalCard}>
              <View style={styles.journalContent}>
                <Text style={styles.journalTitle}>{item.title || 'Untitled'}</Text>
                {item.content && (
                  <Text style={styles.journalContent} numberOfLines={2}>
                    {item.content}
                  </Text>
                )}
                {item.tags && item.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                    {item.tags.length > 3 && (
                      <Text style={styles.moreTagsText}>+{item.tags.length - 3} more</Text>
                    )}
                  </View>
                )}
                {item.createdAt && (
                  <Text style={styles.journalDate}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                )}
              </View>

              <View style={styles.actionButtons}>
                <Pressable
                  style={styles.editButton}
                  onPress={() =>
                    router.push({
                      pathname: '/journals/edit',
                      params: { id: item.id, currentTitle: item.title }
                    })
                  }
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.input.background,
    color: theme.colors.input.text,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: theme.colors.button.secondary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  filtersContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  tagButton: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagButtonActive: {
    backgroundColor: theme.colors.button.secondary,
    borderColor: theme.colors.button.secondary,
  },
  tagButtonText: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
  tagButtonTextActive: {
    color: theme.colors.text.primary,
  },
  listContainer: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    ...theme.typography.subheading,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...theme.typography.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  journalCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...theme.shadows.card,
  },
  journalContent: {
    marginBottom: theme.spacing.md,
  },
  journalTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  journalContent: {
    ...theme.typography.secondary,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  tag: {
    backgroundColor: theme.colors.tag.background,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  tagText: {
    color: theme.colors.tag.text,
    fontSize: 12,
    fontWeight: '500',
  },
  moreTagsText: {
    ...theme.typography.secondary,
    fontSize: 12,
    alignSelf: 'center',
  },
  journalDate: {
    ...theme.typography.secondary,
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  editButton: {
    backgroundColor: theme.colors.button.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flex: 1,
  },
  editButtonText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.button.danger,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flex: 1,
  },
  deleteButtonText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default JournalsFeed
