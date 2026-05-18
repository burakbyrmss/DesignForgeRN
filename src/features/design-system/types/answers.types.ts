export type BrandTone = 'minimal' | 'playful' | 'professional' | 'bold';

export type DesignPhilosophy = 'balanced' | 'minimal' | 'expressive';

export type ColorStylePreference = 'soft' | 'vibrant' | 'neutral';

export type FontFamilyOption = 'inter' | 'system';

export type TypographyScale = 'compact' | 'balanced' | 'spacious';

export type BaseUnit = 4 | 8;

export type SpacingDensity = 'tight' | 'normal' | 'relaxed';

export type RadiusStyle = 'sharp' | 'medium' | 'rounded';

export type ElevationStyle = 'flat' | 'subtle' | 'strong';

export type BorderStyle = 'none' | 'light' | 'strong';

export type MotionSpeed = 'fast' | 'normal' | 'slow';

export type AnimationStyle = 'minimal' | 'smooth' | 'expressive';

export type AccessibilityMode = 'standard' | 'enhanced';

export type SemanticColorKey = 'success' | 'error' | 'warning' | 'info';

export interface SemanticColors {
  success: string;
  error: string;
  warning: string;
  info: string;
}

export interface Answers {
  appName: string;
  brandTones: BrandTone[];
  designPhilosophy: DesignPhilosophy;
  primaryColor: string;
  colorStyle: ColorStylePreference;
  autoGenerateSemanticColors: boolean;
  semanticColors: SemanticColors;
  fontFamily: FontFamilyOption;
  typographyScale: TypographyScale;
  baseUnit: BaseUnit;
  spacingDensity: SpacingDensity;
  radiusStyle: RadiusStyle;
  elevationStyle: ElevationStyle;
  borderStyle: BorderStyle;
  motionSpeed: MotionSpeed;
  animationStyle: AnimationStyle;
  accessibilityMode: AccessibilityMode;
  darkModeEnabled: boolean;
}

export const DEFAULT_SEMANTIC_COLORS: SemanticColors = {
  success: '#16a34a',
  error: '#dc2626',
  warning: '#d97706',
  info: '#2563eb',
};

export const DEFAULT_ANSWERS: Answers = {
  appName: 'DesignForge',
  brandTones: ['minimal'],
  designPhilosophy: 'balanced',
  primaryColor: '#4f46e5',
  colorStyle: 'vibrant',
  autoGenerateSemanticColors: true,
  semanticColors: DEFAULT_SEMANTIC_COLORS,
  fontFamily: 'inter',
  typographyScale: 'balanced',
  baseUnit: 8,
  spacingDensity: 'normal',
  radiusStyle: 'medium',
  elevationStyle: 'subtle',
  borderStyle: 'light',
  motionSpeed: 'normal',
  animationStyle: 'smooth',
  accessibilityMode: 'standard',
  darkModeEnabled: false,
};
