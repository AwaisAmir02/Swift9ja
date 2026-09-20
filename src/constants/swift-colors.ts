/**
 * Swift9JA brand design tokens, extracted from the Figma source file.
 * Used by the customer-facing screens (splash, auth, home, marketplace).
 */

export const SwiftColors = {
  emerald: '#006D40',
  emeraldDark: '#007243',
  emeraldDeep: '#002110',
  mint: '#8DF8B7',
  mintAlt: '#8AF5B4',

  gold: '#F5A623',
  goldLight: '#FFD572',
  goldPale: '#FFDDB4',
  amber: '#835500',
  amberDark: '#644000',
  amberDeep: '#633F00',
  amberDeepest: '#291800',

  charcoal: '#2E3131',
  charcoalDeep: '#191C1C',

  background: '#F8FAF9',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F4F3',
  surfaceMuted2: '#E6E9E8',
  surfaceMuted3: '#ECEEED',
  border: '#E1E3E2',

  textPrimary: '#191C1C',
  textSecondary: '#524534',
  textMuted: '#857462',
  textFaint: '#5A605D',

  white: '#FFFFFF',

  error: '#BA1A1A',
  errorBg: '#FFDAD6',
  errorDeep: '#93000A',

  sovereignStart: '#062010',
  sovereignMid: '#04140A',
  sovereignEnd: '#020904',
} as const;

export const SwiftFontFamily = {
  headingBold: 'PlusJakartaSans_700Bold',
  headingExtraBold: 'PlusJakartaSans_800ExtraBold',
  headingSemiBold: 'PlusJakartaSans_600SemiBold',
  headingMedium: 'PlusJakartaSans_500Medium',
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const SwiftRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 9999,
} as const;

export const SwiftShadow = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  raised: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
} as const;
