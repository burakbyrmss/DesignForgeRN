import { Text, TextInput, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame, TokenButton } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { BrandTone, DesignPhilosophy } from '@/features/design-system/types/answers.types';

export function BrandScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <>
      <FormSection
        title="Brand identity"
        description="Name your product and choose the emotional tone.">
        <Text className="text-sm font-medium text-slate-700">App name</Text>
        <TextInput
          accessibilityLabel="App name"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-900"
          placeholder="My App"
          value={answers.appName}
          onChangeText={value => updateAnswer('appName', value)}
        />
        <OptionChipGroup<BrandTone>
          label="Brand tone"
          multiple
          value={answers.brandTones}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'playful', label: 'Playful' },
            { value: 'professional', label: 'Professional' },
            { value: 'bold', label: 'Bold' },
          ]}
          onChange={value => updateAnswer('brandTones', value as BrandTone[])}
        />
        <OptionChipGroup<DesignPhilosophy>
          label="Design philosophy"
          value={answers.designPhilosophy}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'balanced', label: 'Balanced' },
            { value: 'expressive', label: 'Expressive' },
          ]}
          onChange={value => updateAnswer('designPhilosophy', value as DesignPhilosophy)}
        />
      </FormSection>
    </>
  );

  const preview = (
    <PreviewFrame>
      <View
        style={{
          backgroundColor: tokens.color.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          borderWidth: tokens.border.width,
          borderColor: tokens.border.color,
        }}>
        <Text
          style={{
            color: tokens.color.textMuted,
            fontSize: tokens.typography.caption.fontSize,
            marginBottom: tokens.spacing.xs,
          }}>
          {answers.brandTones.join(' · ')}
        </Text>
        <Text
          style={{
            color: tokens.color.text,
            fontSize: tokens.typography.h1.fontSize,
            lineHeight: tokens.typography.h1.lineHeight,
            fontWeight: tokens.typography.h1.fontWeight,
            marginBottom: tokens.spacing.sm,
          }}>
          {answers.appName}
        </Text>
        <Text
          style={{
            color: tokens.color.textMuted,
            fontSize: tokens.typography.body.fontSize,
            lineHeight: tokens.typography.body.lineHeight,
            marginBottom: tokens.spacing.md,
          }}>
          {answers.designPhilosophy} philosophy with instant visual feedback.
        </Text>
        <TokenButton label="Get started" />
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Brand layer"
      subtitle="Define naming and personality for your design system.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
