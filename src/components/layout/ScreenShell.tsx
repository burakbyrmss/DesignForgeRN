import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DESIGN_SYSTEM_SCREENS } from '@/navigation/types';
import type { RootStackParamList } from '@/navigation/types';

const STEP_SCROLL_PADDING = 16;

interface ScreenShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function ScreenShell({ title, subtitle, children }: ScreenShellProps) {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const stepScrollRef = useRef<ScrollView>(null);
  const stepOffsetsRef = useRef<number[]>([]);
  const currentIndex = DESIGN_SYSTEM_SCREENS.findIndex(
    screen => screen.name === route.name,
  );

  const scrollToActiveStep = useCallback(() => {
    if (currentIndex < 0) {
      return;
    }

    const offset = stepOffsetsRef.current[currentIndex];
    if (offset === undefined) {
      return;
    }

    stepScrollRef.current?.scrollTo({
      x: Math.max(0, offset - STEP_SCROLL_PADDING),
      animated: true,
    });
  }, [currentIndex]);

  useEffect(() => {
    scrollToActiveStep();
  }, [route.name, scrollToActiveStep]);

  const handleStepLayout = useCallback(
    (index: number, x: number) => {
      stepOffsetsRef.current[index] = x;
      if (index === currentIndex) {
        scrollToActiveStep();
      }
    },
    [currentIndex, scrollToActiveStep],
  );

  return (
    <View className="flex-1 bg-slate-100" style={{ paddingTop: insets.top }}>
      <View className="border-b border-slate-200 bg-white px-4 pb-3 pt-2">
        <Text className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          DesignForge
        </Text>
        <Text className="mt-1 text-xl font-bold text-slate-900">{title}</Text>
        <Text className="mt-1 text-sm text-slate-500">{subtitle}</Text>
        <ScrollView
          ref={stepScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerClassName="gap-2 pr-4">
          {DESIGN_SYSTEM_SCREENS.map((screen, index) => {
            const isActive = screen.name === route.name;
            return (
              <Pressable
                key={screen.name}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                onPress={() => navigation.navigate(screen.name)}
                onLayout={event =>
                  handleStepLayout(index, event.nativeEvent.layout.x)
                }
                className={`rounded-full px-3 py-1.5 ${
                  isActive ? 'bg-indigo-600' : 'bg-slate-100'
                }`}>
                <Text
                  className={`text-xs font-semibold ${
                    isActive ? 'text-white' : 'text-slate-600'
                  }`}>
                  {index + 1}. {screen.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <Text className="mt-2 text-xs text-slate-400">
          Step {currentIndex + 1} of {DESIGN_SYSTEM_SCREENS.length}
        </Text>
      </View>
      <View className="flex-1">{children}</View>
    </View>
  );
}
