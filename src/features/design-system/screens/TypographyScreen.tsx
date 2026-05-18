import { Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type {
  FontFamilyOption,
  TypographyScale,
} from '@/features/design-system/types/answers.types';

export function TypographyScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <FormSection title="Typography" description="Choose type scale and family.">
      <OptionChipGroup<FontFamilyOption>
        label="Font family"
        value={answers.fontFamily}
        options={[
          { value: 'inter', label: 'Inter' },
          { value: 'system', label: 'System' },
        ]}
        onChange={value => updateAnswer('fontFamily', value as FontFamilyOption)}
      />
      <OptionChipGroup<TypographyScale>
        label="Scale type"
        value={answers.typographyScale}
        options={[
          { value: 'compact', label: 'Compact' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'spacious', label: 'Spacious' },
        ]}
        onChange={value => updateAnswer('typographyScale', value as TypographyScale)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.sm }}>
        <Text
          style={{
            color: tokens.color.text,
            fontSize: tokens.typography.h1.fontSize,
            lineHeight: tokens.typography.h1.lineHeight,
            fontWeight: tokens.typography.h1.fontWeight,
          }}>
          Heading 1
        </Text>
        <Text
          style={{
            color: tokens.color.text,
            fontSize: tokens.typography.h2.fontSize,
            lineHeight: tokens.typography.h2.lineHeight,
            fontWeight: tokens.typography.h2.fontWeight,
          }}>
          Heading 2
        </Text>
        <Text
          style={{
            color: tokens.color.text,
            fontSize: tokens.typography.h3.fontSize,
            lineHeight: tokens.typography.h3.lineHeight,
            fontWeight: tokens.typography.h3.fontWeight,
          }}>
          Heading 3
        </Text>
        <Text
          style={{
            color: tokens.color.textMuted,
            fontSize: tokens.typography.body.fontSize,
            lineHeight: tokens.typography.body.lineHeight,
          }}>
          Body text demonstrates readable paragraph rhythm for {answers.appName}.
        </Text>
        <Text
          style={{
            color: tokens.color.textMuted,
            fontSize: tokens.typography.caption.fontSize,
            lineHeight: tokens.typography.caption.lineHeight,
          }}>
          Caption · {answers.fontFamily} · {answers.typographyScale}
        </Text>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Typography"
      subtitle="Tune hierarchy and readability across your UI.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
