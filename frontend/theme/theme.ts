import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    // Custom blue shade
    blue: [
      '#E6F0FF', '#CCE0FF', '#99C2FF', '#66A3FF', '#3385FF',
      '#1E40AF', '#1A38A0', '#162F91', '#132782', '#0F1F73'
    ],
    // Custom green shade
    green: [
      '#E6FFF7', '#CCFFF0', '#99FFE0', '#66FFD1', '#34D399',
      '#10B981', '#0EA472', '#0C8F63', '#0A7A54', '#086545'
    ],
  },

  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(40), fontWeight: '700', lineHeight: '1.2' },
      h2: { fontSize: rem(32), fontWeight: '600', lineHeight: '1.3' },
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
    xl: rem(32),
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
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
  },

  other: {
    transition: {
      default: 'all 0.3s cubic-bezier(.23,.82,.45,.97)',
    },
  },
});