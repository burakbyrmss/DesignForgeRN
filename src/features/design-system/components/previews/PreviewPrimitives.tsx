import { Pressable, Text, View } from 'react-native';

import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { Tokens } from '@/features/design-system/types/tokens.types';

interface PreviewFrameProps {
  children: React.ReactNode;
  tokens?: Tokens;
}

export function PreviewFrame({ children, tokens: tokensOverride }: PreviewFrameProps) {
  const { tokens: contextTokens } = useDesignSystem();
  const tokens = tokensOverride ?? contextTokens;

  return (
    <View
      className="overflow-hidden rounded-xl"
      style={{
        backgroundColor: tokens.color.background,
        padding: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        borderWidth: tokens.border.width,
        borderColor: tokens.border.color,
      }}>
      {children}
    </View>
  );
}

interface TokenButtonProps {
  label: string;
  variant?: 'primary' | 'disabled';
}

export function TokenButton({ label, variant = 'primary' }: TokenButtonProps) {
  const { tokens } = useDesignSystem();
  const isDisabled = variant === 'disabled';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className="items-center justify-center px-4 py-2"
      style={{
        backgroundColor: isDisabled
          ? tokens.color.primaryDisabled
          : tokens.color.primary,
        borderRadius: tokens.radius.md,
        opacity: isDisabled ? 0.7 : 1,
      }}>
      <Text style={{ color: tokens.color.onPrimary, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

interface TokenCardProps {
  title: string;
  body: string;
  elevated?: boolean;
}

export function TokenCard({ title, body, elevated = false }: TokenCardProps) {
  const { tokens } = useDesignSystem();

  return (
    <View
      style={[
        {
          backgroundColor: tokens.color.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          borderWidth: tokens.border.width,
          borderColor: tokens.border.color,
        },
        elevated ? tokens.elevation.md : tokens.elevation.none,
      ]}>
      <Text
        style={{
          color: tokens.color.text,
          fontSize: tokens.typography.h3.fontSize,
          fontWeight: tokens.typography.h3.fontWeight,
          marginBottom: tokens.spacing.xs,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: tokens.color.textMuted,
          fontSize: tokens.typography.body.fontSize,
          lineHeight: tokens.typography.body.lineHeight,
        }}>
        {body}
      </Text>
    </View>
  );
}

interface AlertPreviewProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

export function AlertPreview({ type, message }: AlertPreviewProps) {
  const { tokens } = useDesignSystem();
  const colorMap = {
    success: { fg: tokens.color.success, bg: tokens.color.successBackground },
    error: { fg: tokens.color.error, bg: tokens.color.errorBackground },
    warning: { fg: tokens.color.warning, bg: tokens.color.warningBackground },
  }[type];

  return (
    <View
      style={{
        backgroundColor: colorMap.bg,
        borderRadius: tokens.radius.md,
        padding: tokens.spacing.sm,
        borderWidth: tokens.border.width,
        borderColor: colorMap.fg,
      }}>
      <Text style={{ color: colorMap.fg, fontWeight: '600' }}>{message}</Text>
    </View>
  );
}
