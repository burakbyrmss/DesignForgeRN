import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import { PreviewFrame } from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import type { AnimationStyle, MotionSpeed } from '@/features/design-system/types/answers.types';

export function MotionScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();
  const scale = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    const timeout = setTimeout(() => setLoading(false), tokens.motion.durationSlow);
    return () => clearTimeout(timeout);
  }, [loading, tokens.motion.durationSlow]);

  const runPressAnimation = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: tokens.motion.durationFast,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: tokens.motion.durationNormal,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const form = (
    <FormSection title="Motion" description="Set animation speed and personality.">
      <OptionChipGroup<MotionSpeed>
        label="Motion speed"
        value={answers.motionSpeed}
        options={[
          { value: 'fast', label: 'Fast' },
          { value: 'normal', label: 'Normal' },
          { value: 'slow', label: 'Slow' },
        ]}
        onChange={value => updateAnswer('motionSpeed', value as MotionSpeed)}
      />
      <OptionChipGroup<AnimationStyle>
        label="Animation style"
        value={answers.animationStyle}
        options={[
          { value: 'minimal', label: 'Minimal' },
          { value: 'smooth', label: 'Smooth' },
          { value: 'expressive', label: 'Expressive' },
        ]}
        onChange={value => updateAnswer('animationStyle', value as AnimationStyle)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.md }}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            accessibilityRole="button"
            onPress={runPressAnimation}
            style={{
              backgroundColor: tokens.color.primary,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              alignItems: 'center',
            }}>
            <Text style={{ color: tokens.color.onPrimary, fontWeight: '600' }}>
              Press me
            </Text>
          </Pressable>
        </Animated.View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setLoading(true)}
          style={{
            borderRadius: tokens.radius.md,
            borderWidth: tokens.border.width,
            borderColor: tokens.border.color,
            padding: tokens.spacing.md,
            backgroundColor: tokens.color.surface,
          }}>
          <Text style={{ color: tokens.color.text, fontWeight: '600' }}>
            {loading ? 'Loading…' : 'Trigger loading state'}
          </Text>
        </Pressable>
        <Text style={{ color: tokens.color.textMuted, fontSize: tokens.typography.caption.fontSize }}>
          {tokens.motion.durationNormal}ms normal · {answers.animationStyle}
        </Text>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Motion system"
      subtitle="Preview interaction timing and feedback states.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
