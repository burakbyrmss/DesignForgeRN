import { Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame, TokenCard } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { BaseUnit, SpacingDensity } from '@/features/design-system/types/answers.types';

export function SpacingScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();

  const form = (
    <FormSection title="Spacing" description="Set rhythm with base unit and density.">
      <OptionChipGroup<'4' | '8'>
        label="Base unit"
        value={String(answers.baseUnit) as '4' | '8'}
        options={[
          { value: '4', label: '4pt' },
          { value: '8', label: '8pt' },
        ]}
        onChange={value =>
          updateAnswer('baseUnit', Number(value) as BaseUnit)
        }
      />
      <OptionChipGroup<SpacingDensity>
        label="Density"
        value={answers.spacingDensity}
        options={[
          { value: 'tight', label: 'Tight' },
          { value: 'normal', label: 'Normal' },
          { value: 'relaxed', label: 'Relaxed' },
        ]}
        onChange={value => updateAnswer('spacingDensity', value as SpacingDensity)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.md }}>
        <TokenCard
          title="Card padding"
          body={`Uses md spacing (${tokens.spacing.md}px) inside the card.`}
        />
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {[tokens.spacing.xs, tokens.spacing.sm, tokens.spacing.md, tokens.spacing.lg].map(
            size => (
              <View
                key={size}
                style={{
                  flex: 1,
                  height: size * 2,
                  backgroundColor: tokens.color.primary,
                  borderRadius: tokens.radius.sm,
                  opacity: 0.85,
                }}
              />
            ),
          )}
        </View>
        <Text style={{ color: tokens.color.textMuted, fontSize: tokens.typography.caption.fontSize }}>
          Rhythm grid · base {answers.baseUnit}pt · {answers.spacingDensity}
        </Text>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Spacing system"
      subtitle="Control layout density and vertical rhythm.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
