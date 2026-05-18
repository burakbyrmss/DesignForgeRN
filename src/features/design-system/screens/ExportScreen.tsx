import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { OptionChipGroup } from '@/components/ui/OptionChipGroup';
import {
  AlertPreview,
  PreviewFrame,
  TokenButton,
  TokenCard,
} from '@/features/design-system/components/previews/PreviewPrimitives';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import {
  exportDesignSystem,
  type ExportFormat,
} from '@/features/design-system/utils/exportDesignSystem';

export function ExportScreen() {
  const { answers, tokens } = useDesignSystem();
  const [format, setFormat] = useState<ExportFormat>('markdown');

  const exported = useMemo(
    () => exportDesignSystem(format, answers, tokens),
    [format, answers, tokens],
  );

  const copyExport = () => {
    Clipboard.setString(exported);
    Alert.alert('Copied', `${format.toUpperCase()} export copied to clipboard.`);
  };

  const form = (
    <FormSection
      title="Export"
      description="Copy your design system as Markdown, Tailwind, or JSON.">
      <OptionChipGroup<ExportFormat>
        label="Export format"
        value={format}
        options={[
          { value: 'markdown', label: 'Markdown' },
          { value: 'tailwind', label: 'Tailwind' },
          { value: 'json', label: 'JSON' },
        ]}
        onChange={value => setFormat(value as ExportFormat)}
      />
      <Pressable
        accessibilityRole="button"
        onPress={copyExport}
        className="items-center rounded-xl bg-indigo-600 px-4 py-3 active:bg-indigo-700">
        <Text className="text-sm font-semibold text-white">Copy to clipboard</Text>
      </Pressable>
      <ScrollView
        className="max-h-64 rounded-xl border border-slate-200 bg-slate-950"
        nestedScrollEnabled>
        <Text className="p-3 font-mono text-xs text-slate-100">{exported}</Text>
      </ScrollView>
    </FormSection>
  );

  const preview = (
    <ScrollView nestedScrollEnabled>
      <PreviewFrame>
        <View style={{ gap: tokens.spacing.md }}>
          <Text
            style={{
              color: tokens.color.text,
              fontSize: tokens.typography.h2.fontSize,
              fontWeight: tokens.typography.h2.fontWeight,
            }}>
            {answers.appName}
          </Text>
          <TokenButton label="Primary action" />
          <TokenCard
            title="Documentation preview"
            body="Your generated tokens drive buttons, alerts, and surfaces across the full system."
          />
          <AlertPreview type="success" message="Export ready" />
        </View>
      </PreviewFrame>
    </ScrollView>
  );

  return (
    <ScreenShell
      title="Final output"
      subtitle="Export and review your complete design system.">
      <SplitScreenLayout
        form={form}
        preview={preview}
        previewLabel="Full system preview"
      />
    </ScreenShell>
  );
}
