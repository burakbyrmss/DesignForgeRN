import { Text, View } from 'react-native';

import type { Answers } from '@/features/design-system/types/answers.types';
import type { Tokens } from '@/features/design-system/types/tokens.types';

interface ThemePanelProps {
  label: string;
  appName: Answers['appName'];
  tokens: Tokens;
}

export function ThemePanel({ label, appName, tokens }: ThemePanelProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.color.background,
        borderRadius: tokens.radius.md,
        padding: tokens.spacing.sm,
        borderWidth: tokens.border.width,
        borderColor: tokens.border.color,
      }}>
      <Text
        style={{
          color: tokens.color.textMuted,
          fontSize: tokens.typography.caption.fontSize,
          marginBottom: tokens.spacing.xs,
        }}>
        {label}
      </Text>
      <Text
        style={{
          color: tokens.color.text,
          fontWeight: '600',
          marginBottom: tokens.spacing.sm,
        }}>
        {appName}
      </Text>
      <View
        style={{
          backgroundColor: tokens.color.primary,
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.xs,
          alignItems: 'center',
        }}>
        <Text style={{ color: tokens.color.onPrimary, fontSize: 12 }}>Action</Text>
      </View>
    </View>
  );
}
