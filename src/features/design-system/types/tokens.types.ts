export interface ColorTokens {
  primary: string;
  primaryHover: string;
  primaryDisabled: string;
  onPrimary: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  successBackground: string;
  errorBackground: string;
  warningBackground: string;
}

export interface TypographyTokens {
  fontFamily: string;
  h1: { fontSize: number; lineHeight: number; fontWeight: '700' | '600' };
  h2: { fontSize: number; lineHeight: number; fontWeight: '700' | '600' };
  h3: { fontSize: number; lineHeight: number; fontWeight: '600' };
  body: { fontSize: number; lineHeight: number; fontWeight: '400' };
  caption: { fontSize: number; lineHeight: number; fontWeight: '400' };
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface RadiusTokens {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ElevationTokens {
  none: object;
  sm: object;
  md: object;
  lg: object;
}

export interface BorderTokens {
  width: number;
  color: string;
}

export interface MotionTokens {
  durationFast: number;
  durationNormal: number;
  durationSlow: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface Tokens {
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  elevation: ElevationTokens;
  border: BorderTokens;
  motion: MotionTokens;
  isDark: boolean;
  contrastRatio: number;
}
