// theme/theme.ts
import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'teal',
  colors: {
    
    teal: [
      '#E6FCF5', '#C3FAE8', '#96F2D7', '#63E6BE', '#38D9A9',
      '#20C997', '#12B886', '#0CA678', '#099268', '#087F5B'
    ],
  },

  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'Roboto Mono, monospace',

  headings: {
    fontFamily: 'Poppins, sans-serif',
    sizes: {
      h1: { fontSize: rem(48), fontWeight: '700', lineHeight: '1.2' },
      h2: { fontSize: rem(36), fontWeight: '600', lineHeight: '1.3' },
      h3: { fontSize: rem(28), fontWeight: '600', lineHeight: '1.4' },
      h4: { fontSize: rem(24), fontWeight: '600', lineHeight: '1.4' },
      h5: { fontSize: rem(20), fontWeight: '600', lineHeight: '1.5' },
      h6: { fontSize: rem(16), fontWeight: '600', lineHeight: '1.5' },
    },
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },

  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(24),
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(32),
    xl: rem(64),
  },

  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  other: {
    transition: {
      default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
});