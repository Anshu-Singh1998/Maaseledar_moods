import { Appearance } from 'react-native';

const isDarkMode = Appearance.getColorScheme() === 'dark';

/**
 * Base palette (DO NOT use directly in UI)
 */
const palette = {
  white: '#FFFFFF',
  black: '#000000',

  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  primary500: '#2563EB',
  primary600: '#1D4ED8',

  success500: '#16A34A',
  warning500: '#F59E0B',
  error500: '#DC2626',

  ORANGE: '#F97316',
  ORANGE_DARK: '#EA6C0A',
  ORANGE_LIGHT: '#FFF7ED',
  ORANGE_PALE: '#FFEDD5',

  DARK: '#1C1C1E',
};

/**
 * Semantic colors (USE THESE IN UI)
 */
const colors = {
  background:    isDarkMode ? palette.gray900      : palette.white,
  surface:       isDarkMode ? palette.gray500      : palette.gray500,
  surfaceLight:  isDarkMode ? palette.gray800      : palette.gray50,
  textPrimary:   isDarkMode ? palette.white        : palette.gray900,
  textSecondary: isDarkMode ? palette.gray300      : palette.gray600,
  textDisabled:  palette.gray400,

  primary:       palette.primary500,
  primaryDark:   palette.primary600,

  border:        isDarkMode ? palette.gray700      : palette.gray200,

  success:       palette.success500,
  warning:       palette.warning500,
  error:         palette.error500,

  orange:        palette.ORANGE,
  orange_dark:   palette.ORANGE_DARK,
  oraLight:      isDarkMode ? '#2A1A0A'            : palette.ORANGE_LIGHT,
  pale:          isDarkMode ? '#3D2208'            : palette.ORANGE_PALE,

  dark:          isDarkMode ? palette.white        : palette.DARK,
  background2:   isDarkMode ? palette.gray800      : palette.white,
};

export default colors;

// ── Named exports so screens can import individually ──────────────────
export const background    = colors.background;
export const surface       = colors.surface;
export const surfaceLight  = colors.surfaceLight;
export const textPrimary   = colors.textPrimary;
export const textSecondary = colors.textSecondary;
export const textDisabled  = colors.textDisabled;
export const primary       = colors.primary;
export const primaryDark   = colors.primaryDark;
export const border        = colors.border;
export const success       = colors.success;
export const warning       = colors.warning;
export const error         = colors.error;
export const orange        = colors.orange;
export const orange_dark   = colors.orange_dark;
export const oraLight      = colors.oraLight;
export const pale          = colors.pale;
export const dark          = colors.dark;