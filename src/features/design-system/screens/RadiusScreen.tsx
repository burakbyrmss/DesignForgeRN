import { Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame, TokenButton } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { RadiusStyle } from '@/features/design-system/types/answers.types';

export function RadiusScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <FormSection title="Radius" description="Choose corner personality for components.">
      <OptionChipGroup<RadiusStyle>
        label="Radius style"
        value={answers.radiusStyle}
        options={[
          { value: 'sharp', label: 'Sharp' },
          { value: 'medium', label: 'Medium' },
          { value: 'rounded', label: 'Rounded' },
        ]}
        onChange={value => updateAnswer('radiusStyle', value as RadiusStyle)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.sm }}>
        <TokenButton label="Button" />
        <View
          style={{
            backgroundColor: tokens.color.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            borderWidth: tokens.border.width,
            borderColor: tokens.border.color,
          }}>
          <Text style={{ color: tokens.color.text, fontWeight: '600' }}>Card</Text>
        </View>
        <View
          style={{
            borderRadius: tokens.radius.md,
            borderWidth: Math.max(tokens.border.width, 1),
            borderColor: tokens.color.border,
            padding: tokens.spacing.sm,
          }}>
          <Text style={{ color: tokens.color.textMuted }}>Input field</Text>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: tokens.color.primary,
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
          }}>
          <Text style={{ color: tokens.color.onPrimary, fontSize: 12 }}>Tag</Text>
        </View>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Radius system"
      subtitle="Preview corners on buttons, cards, inputs, and tags.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
