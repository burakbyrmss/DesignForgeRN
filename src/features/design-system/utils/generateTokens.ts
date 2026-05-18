import type { Answers } from '@/features/design-system/types/answers.types';
import type {
  ColorTokens,
  ElevationTokens,
  MotionTokens,
  RadiusTokens,
  SpacingTokens,
  Tokens,
  TypographyTokens,
} from '@/features/design-system/types/tokens.types';
import {
  contrastRatio,
  darken,
  mixColors,
  pickOnColor,
} from '@/features/design-system/utils/colorUtils';

function buildSemanticColors(answers: Answers): {
  success: string;
  error: string;
  warning: string;
  info: string;
} {
  if (!answers.autoGenerateSemanticColors) {
    return answers.semanticColors;
  }

  const { primaryColor, colorStyle } = answers;
  const softFactor = colorStyle === 'soft' ? 0.25 : colorStyle === 'neutral' ? 0.1 : 0;

  return {
    success: mixColors('#16a34a', primaryColor, softFactor * 0.2),
    error: mixColors('#dc2626', primaryColor, softFactor * 0.15),
    warning: mixColors('#d97706', primaryColor, softFactor * 0.15),
    info: mixColors('#2563eb', primaryColor, softFactor * 0.35),
  };
}

function buildColorTokens(answers: Answers): ColorTokens {
  const semantic = buildSemanticColors(answers);
  const isDark = answers.darkModeEnabled;
  const primary = answers.primaryColor;
  const primaryHover = darken(primary, isDark ? 0.08 : 0.12);
  const primaryDisabled = mixColors(primary, isDark ? '#1e293b' : '#e2e8f0', 0.55);

  const background = isDark ? '#0b1220' : '#f8fafc';
  const surface = isDark ? '#111827' : '#ffffff';
  const surfaceElevated = isDark ? '#1f2937' : '#f1f5f9';
  const text = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const borderStrength =
    answers.borderStyle === 'none' ? 0 : answers.borderStyle === 'light' ? 0.12 : 0.28;
  const border = mixColors(surface, text, borderStrength);

  const enhanced = answers.accessibilityMode === 'enhanced';
  const textColor = enhanced && !isDark ? darken(text, 0.15) : text;

  return {
    primary,
    primaryHover,
    primaryDisabled,
    onPrimary: pickOnColor(primary),
    background,
    surface,
    surfaceElevated,
    text: textColor,
    textMuted,
    border,
    success: semantic.success,
    error: semantic.error,
    warning: semantic.warning,
    info: semantic.info,
    successBackground: mixColors(semantic.success, background, 0.88),
    errorBackground: mixColors(semantic.error, background, 0.9),
    warningBackground: mixColors(semantic.warning, background, 0.88),
  };
}

function buildTypographyTokens(answers: Answers): TypographyTokens {
  const scaleMultiplier =
    answers.typographyScale === 'compact'
      ? 0.9
      : answers.typographyScale === 'spacious'
        ? 1.12
        : 1;

  const playfulBoost = answers.brandTones.includes('playful') ? 1.04 : 1;
  const factor = scaleMultiplier * playfulBoost;

  return {
    fontFamily: answers.fontFamily === 'inter' ? 'System' : 'System',
    h1: {
      fontSize: Math.round(32 * factor),
      lineHeight: Math.round(40 * factor),
      fontWeight: answers.brandTones.includes('bold') ? '700' : '600',
    },
    h2: {
      fontSize: Math.round(24 * factor),
      lineHeight: Math.round(32 * factor),
      fontWeight: '600',
    },
    h3: {
      fontSize: Math.round(20 * factor),
      lineHeight: Math.round(28 * factor),
      fontWeight: '600',
    },
    body: {
      fontSize: Math.round(16 * factor),
      lineHeight: Math.round(24 * factor),
      fontWeight: '400',
    },
    caption: {
      fontSize: Math.round(13 * factor),
      lineHeight: Math.round(18 * factor),
      fontWeight: '400',
    },
  };
}

function buildSpacingTokens(answers: Answers): SpacingTokens {
  const densityMultiplier =
    answers.spacingDensity === 'tight'
      ? 0.85
      : answers.spacingDensity === 'relaxed'
        ? 1.2
        : 1;
  const unit = answers.baseUnit * densityMultiplier;

  return {
    xs: unit * 0.5,
    sm: unit,
    md: unit * 2,
    lg: unit * 3,
    xl: unit * 4,
    xxl: unit * 6,
  };
}

function buildRadiusTokens(answers: Answers): RadiusTokens {
  const map = {
    sharp: { sm: 2, md: 4, lg: 6, xl: 8, full: 999 },
    medium: { sm: 6, md: 10, lg: 14, xl: 18, full: 999 },
    rounded: { sm: 10, md: 16, lg: 22, xl: 28, full: 999 },
  } as const;

  return map[answers.radiusStyle];
}

function buildElevationTokens(answers: Answers): ElevationTokens {
  const isDark = answers.darkModeEnabled;
  const shadowColor = isDark ? '#000000' : '#0f172a';

  if (answers.elevationStyle === 'flat') {
    return {
      none: {},
      sm: {},
      md: {},
      lg: {},
    };
  }

  const strength =
    answers.elevationStyle === 'subtle'
      ? { sm: 0.08, md: 0.12, lg: 0.18 }
      : { sm: 0.14, md: 0.22, lg: 0.32 };

  const createShadow = (opacity: number, radius: number, height: number) => ({
    shadowColor,
    shadowOffset: { width: 0, height },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: height,
  });

  return {
    none: {},
    sm: createShadow(strength.sm, 4, 2),
    md: createShadow(strength.md, 8, 4),
    lg: createShadow(strength.lg, 16, 8),
  };
}

function buildMotionTokens(answers: Answers): MotionTokens {
  const speedMap = {
    fast: { fast: 120, normal: 180, slow: 240 },
    normal: { fast: 160, normal: 240, slow: 320 },
    slow: { fast: 200, normal: 320, slow: 420 },
  }[answers.motionSpeed];

  const easing =
    answers.animationStyle === 'minimal'
      ? 'linear'
      : answers.animationStyle === 'expressive'
        ? 'ease-in-out'
        : 'ease-out';

  return {
    durationFast: speedMap.fast,
    durationNormal: speedMap.normal,
    durationSlow: speedMap.slow,
    easing,
  };
}

export function generateTokens(answers: Answers): Tokens {
  const color = buildColorTokens(answers);
  const textContrast = contrastRatio(color.text, color.background);

  return {
    color,
    typography: buildTypographyTokens(answers),
    spacing: buildSpacingTokens(answers),
    radius: buildRadiusTokens(answers),
    elevation: buildElevationTokens(answers),
    border: {
      width: answers.borderStyle === 'none' ? 0 : answers.borderStyle === 'light' ? 1 : 2,
      color: color.border,
    },
    motion: buildMotionTokens(answers),
    isDark: answers.darkModeEnabled,
    contrastRatio: Number(textContrast.toFixed(2)),
  };
}

export const PRESET_PRIMARY_COLORS = [
  '#4f46e5',
  '#2563eb',
  '#0891b2',
  '#059669',
  '#d97706',
  '#dc2626',
  '#db2777',
  '#7c3aed',
  '#0f172a',
];
