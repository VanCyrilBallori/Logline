// Theme constants for consistent styling across the app
export const themes = {
  dark: {
    colors: {
      primary: '#3b82f6', // Primary blue
      secondary: '#21cc8d', // Secondary green
      background: '#121212',
      surface: '#1e1e1e',
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
        error: '#ef4444',
      },
      input: {
        background: '#ffffff',
        text: '#000000',
        placeholder: '#6b7280',
      },
      button: {
        primary: '#3b82f6',
        primaryDisabled: '#2563eb',
        secondary: '#21cc8d',
        secondaryDisabled: '#16a085',
        danger: '#ef4444',
      },
      tag: {
        background: '#21cc8d',
        text: '#ffffff',
      },
    },
  },
  light: {
    colors: {
      primary: '#3b82f6',
      secondary: '#21cc8d',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: {
        primary: '#000000',
        secondary: '#6b7280',
        error: '#ef4444',
      },
      input: {
        background: '#ffffff',
        text: '#000000',
        placeholder: '#9ca3af',
        border: '#d1d5db',
      },
      button: {
        primary: '#3b82f6',
        primaryDisabled: '#93c5fd',
        secondary: '#21cc8d',
        secondaryDisabled: '#86efac',
        danger: '#ef4444',
      },
      tag: {
        background: '#21cc8d',
        text: '#ffffff',
      },
    },
  },
  journaling: {
    colors: {
      primary: '#8b4513', // Saddle brown
      secondary: '#d2691e', // Chocolate
      background: '#f5f0e6', // Beige
      surface: '#faf8f3',
      text: {
        primary: '#3c2415', // Dark brown
        secondary: '#6b4e3d',
        error: '#d2691e',
      },
      input: {
        background: '#ffffff',
        text: '#3c2415',
        placeholder: '#8b7355',
        border: '#d4c4a8',
      },
      button: {
        primary: '#8b4513',
        primaryDisabled: '#a0522d',
        secondary: '#d2691e',
        secondaryDisabled: '#cd853f',
        danger: '#d2691e',
      },
      tag: {
        background: '#d2691e',
        text: '#ffffff',
      },
    },
  },
}

// Default theme
export const theme = themes.dark

// Typography (theme-independent)
export const typography = {
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  secondary: {
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
  },
}
// Spacing and other constants (theme-independent)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
}

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}
