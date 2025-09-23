// app/journals/_layout.jsx
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function JournalsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Your Journals',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'book' : 'book-outline'}
              color="black"
            />
          ),
        }}
      />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create Journal',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'create' : 'create-outline'}
                color="black"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'settings' : 'settings-outline'}
                color="black"
              />
            ),
          }}
        />

        {/* Hide edit from tab bar */}
        <Tabs.Screen
          name="edit"
          options={{ href: null }}
        />
    </Tabs>
  )
}
