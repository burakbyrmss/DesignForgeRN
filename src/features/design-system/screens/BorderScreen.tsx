import { Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { BorderStyle } from '@/features/design-system/types/answers.types';

export function BorderScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <FormSection title="Borders" description="Define dividers and outlines.">
      <OptionChipGroup<BorderStyle>
        label="Border style"
        value={answers.borderStyle}
        options={[
          { value: 'none', label: 'None' },
          { value: 'light', label: 'Light' },
          { value: 'strong', label: 'Strong' },
        ]}
        onChange={value => updateAnswer('borderStyle', value as BorderStyle)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.md }}>
        <View
          style={{
            borderRadius: tokens.radius.md,
            borderWidth: Math.max(tokens.border.width, 1),
            borderColor: tokens.border.color,
            padding: tokens.spacing.sm,
          }}>
          <Text style={{ color: tokens.color.text }}>Input outline</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: tokens.border.color,
            width: '100%',
          }}
        />
        <View
          style={{
            backgroundColor: tokens.color.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            borderWidth: tokens.border.width,
            borderColor: tokens.border.color,
          }}>
          <Text style={{ color: tokens.color.textMuted }}>Card border</Text>
        </View>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Border system"
      subtitle="Preview inputs, dividers, and card outlines.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
