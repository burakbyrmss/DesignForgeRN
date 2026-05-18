import { Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { AlertPreview, PreviewFrame } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { AccessibilityMode } from '@/features/design-system/types/answers.types';

export function AccessibilityScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();
  const largeText = answers.accessibilityMode === 'enhanced';

  const form = (
    <FormSection
      title="Accessibility"
      description="Tune contrast and readable defaults.">
      <OptionChipGroup<AccessibilityMode>
        label="Accessibility mode"
        value={answers.accessibilityMode}
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'enhanced', label: 'Enhanced' },
        ]}
        onChange={value => updateAnswer('accessibilityMode', value as AccessibilityMode)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.md }}>
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.sm,
          }}>
          <View
            style={{
              flex: 1,
              padding: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.color.surface,
            }}>
            <Text style={{ color: tokens.color.textMuted, fontSize: 12 }}>Text</Text>
            <Text style={{ color: tokens.color.text, fontWeight: '700' }}>
              {tokens.contrastRatio}:1
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              padding: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.color.primary,
            }}>
            <Text style={{ color: tokens.color.onPrimary, fontSize: 12 }}>On primary</Text>
            <Text style={{ color: tokens.color.onPrimary, fontWeight: '700' }}>AA+</Text>
          </View>
        </View>
        <Text
          style={{
            color: tokens.color.text,
            fontSize: largeText
              ? tokens.typography.h2.fontSize
              : tokens.typography.body.fontSize,
            lineHeight: largeText
              ? tokens.typography.h2.lineHeight
              : tokens.typography.body.lineHeight,
          }}>
          Dynamic type preview for body content.
        </Text>
        <AlertPreview type="error" message="Accessible error state" />
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Accessibility"
      subtitle="Validate contrast, scaling, and error visibility.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
