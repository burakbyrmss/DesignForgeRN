import { View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { ToggleRow } from '@/components/ui/ToggleRow';
import {
  AlertPreview,
  PreviewFrame,
  TokenButton,
} from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { ColorStylePreference } from '@/features/design-system/types/answers.types';

export function ColorScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <FormSection
      title="Color system"
      description="Pick a primary color and semantic palette behavior.">
      <ColorPicker
        label="Primary color"
        value={answers.primaryColor}
        onChange={color => updateAnswer('primaryColor', color)}
      />
      <OptionChipGroup<ColorStylePreference>
        label="Style preference"
        value={answers.colorStyle}
        options={[
          { value: 'soft', label: 'Soft' },
          { value: 'vibrant', label: 'Vibrant' },
          { value: 'neutral', label: 'Neutral' },
        ]}
        onChange={value => updateAnswer('colorStyle', value as ColorStylePreference)}
      />
      <ToggleRow
        label="Auto-generate semantic colors"
        description="Derive success, error, and warning from your primary."
        value={answers.autoGenerateSemanticColors}
        onValueChange={value => updateAnswer('autoGenerateSemanticColors', value)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <TokenButton label="Primary" />
          <TokenButton label="Disabled" variant="disabled" />
        </View>
        <AlertPreview type="success" message="Changes saved successfully" />
        <AlertPreview type="error" message="Something went wrong" />
        <AlertPreview type="warning" message="Please review your input" />
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            marginTop: tokens.spacing.xs,
          }}>
          <View
            style={{
              flex: 1,
              height: 56,
              backgroundColor: tokens.color.background,
              borderRadius: tokens.radius.md,
              borderWidth: tokens.border.width,
              borderColor: tokens.border.color,
            }}
          />
          <View
            style={{
              flex: 1,
              height: 56,
              backgroundColor: tokens.color.surface,
              borderRadius: tokens.radius.md,
              borderWidth: tokens.border.width,
              borderColor: tokens.border.color,
            }}
          />
          <View
            style={{
              flex: 1,
              height: 56,
              backgroundColor: tokens.color.surfaceElevated,
              borderRadius: tokens.radius.md,
              borderWidth: tokens.border.width,
              borderColor: tokens.border.color,
            }}
          />
        </View>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Color system"
      subtitle="Configure palette tokens with live component feedback.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
