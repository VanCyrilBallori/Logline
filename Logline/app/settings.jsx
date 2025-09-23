import { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Switch, 
  Alert,
  Share,
  Linking
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from './context/ThemeContext'
import { useAuth } from './context/AuthContext'
import { useJournals } from './hooks/useJournals'
import { typography, spacing, borderRadius, shadows } from './constants/theme'

export default function Settings() {
  const { theme, currentTheme, changeTheme, availableThemes } = useTheme()
  const { user, logout } = useAuth()
  const { allJournals } = useJournals()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleThemeChange = (themeName) => {
    changeTheme(themeName)
  }

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'Password change functionality will be implemented in a future update.',
      [{ text: 'OK' }]
    )
  }

  const handleExportJournals = async () => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        userEmail: user?.email,
        journals: allJournals.map(journal => ({
          title: journal.title,
          content: journal.content,
          tags: journal.tags,
          createdAt: journal.createdAt,
          updatedAt: journal.updatedAt
        }))
      }

      const jsonString = JSON.stringify(exportData, null, 2)
      
      await Share.share({
        message: jsonString,
        title: 'LogLine Journals Export'
      })
    } catch (error) {
      Alert.alert('Export Failed', 'Unable to export journals. Please try again.')
    }
  }

  const handleAbout = () => {
    Alert.alert(
      'About LogLine',
      'LogLine v1.0.0\n\nA beautiful journaling app for capturing your thoughts and memories.\n\nDeveloped with ❤️ for mindful writing.',
      [{ text: 'OK' }]
    )
  }

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: logout
        }
      ]
    )
  }

  const SettingItem = ({ title, subtitle, onPress, rightComponent, isLast = false }) => (
    <Pressable 
      style={[styles.settingItem, isLast && styles.settingItemLast]} 
      onPress={onPress}
    >
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.colors.text.primary }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: theme.colors.text.secondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent}
    </Pressable>
  )

  const ThemeOption = ({ themeName, isSelected, onSelect }) => (
    <Pressable 
      style={[
        styles.themeOption,
        { 
          backgroundColor: theme.colors.surface,
          borderColor: isSelected ? theme.colors.primary : 'transparent'
        }
      ]}
      onPress={() => onSelect(themeName)}
    >
      <View style={styles.themePreview}>
        <View style={[
          styles.themePreviewColor,
          { backgroundColor: themes[themeName].colors.background }
        ]} />
        <View style={[
          styles.themePreviewAccent,
          { backgroundColor: themes[themeName].colors.primary }
        ]} />
      </View>
      <Text style={[styles.themeName, { color: theme.colors.text.primary }]}>
        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
      </Text>
      {isSelected && (
        <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]} />
      )}
    </Pressable>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Customize your LogLine experience
          </Text>
        </View>

        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Appearance
          </Text>
          <View style={styles.themeGrid}>
            {availableThemes.map((themeName) => (
              <ThemeOption
                key={themeName}
                themeName={themeName}
                isSelected={currentTheme === themeName}
                onSelect={handleThemeChange}
              />
            ))}
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Account
          </Text>
          <View style={[styles.settingsGroup, { backgroundColor: theme.colors.surface }]}>
            <SettingItem
              title="Change Password"
              subtitle="Update your account password"
              onPress={handleChangePassword}
            />
            <SettingItem
              title="Notifications"
              subtitle="Receive journal reminders"
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
                />
              }
            />
          </View>
        </View>

        {/* Data Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Data
          </Text>
          <View style={[styles.settingsGroup, { backgroundColor: theme.colors.surface }]}>
            <SettingItem
              title="Export Journals"
              subtitle={`Export ${allJournals.length} journals as JSON`}
              onPress={handleExportJournals}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            About
          </Text>
          <View style={[styles.settingsGroup, { backgroundColor: theme.colors.surface }]}>
            <SettingItem
              title="About LogLine"
              subtitle="Version 1.0.0"
              onPress={handleAbout}
            />
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <Pressable 
            style={[styles.logoutButton, { backgroundColor: theme.colors.button.danger }]}
            onPress={handleLogout}
          >
            <Text style={[styles.logoutText, { color: theme.colors.text.primary }]}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.secondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.subheading,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  themeGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  themeOption: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    ...shadows.card,
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  themePreviewColor: {
    flex: 1,
  },
  themePreviewAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
  },
  themeName: {
    ...typography.secondary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsGroup: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    ...typography.secondary,
    fontSize: 12,
  },
  logoutButton: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.card,
  },
  logoutText: {
    ...typography.button,
    fontWeight: '600',
  },
})
