import { Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { ElevationStyle } from '@/features/design-system/types/answers.types';

export function ElevationScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <FormSection title="Elevation" description="Control depth with shadow presets.">
      <OptionChipGroup<ElevationStyle>
        label="Elevation style"
        value={answers.elevationStyle}
        options={[
          { value: 'flat', label: 'Flat' },
          { value: 'subtle', label: 'Subtle' },
          { value: 'strong', label: 'Strong' },
        ]}
        onChange={value => updateAnswer('elevationStyle', value as ElevationStyle)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.md }}>
        <View
          style={[
            {
              backgroundColor: tokens.color.surface,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.md,
            },
            tokens.elevation.sm,
          ]}>
          <Text style={{ color: tokens.color.text, fontWeight: '600' }}>Card · small shadow</Text>
        </View>
        <View
          style={[
            {
              backgroundColor: tokens.color.surface,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.md,
            },
            tokens.elevation.lg,
          ]}>
          <Text style={{ color: tokens.color.text, fontWeight: '600' }}>Modal surface</Text>
        </View>
        <View
          style={[
            {
              alignSelf: 'flex-end',
              backgroundColor: tokens.color.primary,
              borderRadius: tokens.radius.full,
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            },
            tokens.elevation.md,
          ]}>
          <Text style={{ color: tokens.color.onPrimary, fontWeight: '700' }}>+</Text>
        </View>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Elevation system"
      subtitle="See shadows on cards, modals, and floating actions.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
