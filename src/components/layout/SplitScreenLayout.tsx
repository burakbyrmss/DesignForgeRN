import { useState, type ReactNode } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  Text,
  UIManager,
  View,
  useWindowDimensions,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SplitScreenLayoutProps {
  form: ReactNode;
  preview: ReactNode;
  previewLabel?: string;
}

export function SplitScreenLayout({
  form,
  preview,
  previewLabel = 'Live preview',
}: SplitScreenLayoutProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const [previewExpanded, setPreviewExpanded] = useState(true);

  const togglePreview = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPreviewExpanded(previous => !previous);
  };

  if (isWide) {
    return (
      <View className="flex-1 flex-row bg-slate-100">
        <ScrollView
          className="flex-1 border-r border-slate-200 bg-white"
          contentContainerClassName="p-4 pb-8"
          keyboardShouldPersistTaps="handled">
          {form}
        </ScrollView>
        <View className="flex-1 bg-slate-50">
          <View className="border-b border-slate-200 bg-white px-4 py-3">
            <Text className="text-sm font-semibold text-slate-700">{previewLabel}</Text>
          </View>
          <ScrollView
            className="flex-1"
            contentContainerClassName="p-4 pb-8"
            nestedScrollEnabled>
            {preview}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 pb-4"
        keyboardShouldPersistTaps="handled">
        {form}
      </ScrollView>
      <View className="border-t border-slate-200 bg-white">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            previewExpanded ? 'Collapse live preview' : 'Expand live preview'
          }
          onPress={togglePreview}
          className="flex-row items-center justify-between px-4 py-3 active:bg-slate-50">
          <Text className="text-sm font-semibold text-slate-700">{previewLabel}</Text>
          <Text className="text-xs font-medium text-indigo-600">
            {previewExpanded ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
        {previewExpanded ? (
          <ScrollView
            className="max-h-80 border-t border-slate-100 bg-slate-50"
            contentContainerClassName="p-4 pb-6"
            nestedScrollEnabled>
            {preview}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
}
