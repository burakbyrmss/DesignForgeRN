import { View } from 'react-native';

import { SplitScreenLayout } from '@/components/layout/SplitScreenLayout';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { FormSection } from '@/components/ui/FormSection';
import { ToggleRow } from '@/components/ui/ToggleRow';
import { PreviewFrame, TokenButton } from '@/features/design-system/components/previews/PreviewPrimitives';
import { ThemePanel } from '@/features/design-system/components/previews/ThemePanel';
import { useDesignSystem } from '@/features/design-system/hooks/useDesignSystem';
import { generateTokens } from '@/features/design-system/utils/generateTokens';

export function ThemingScreen() {
  const { answers, tokens, updateAnswer } = useDesignSystem();
  const lightTokens = generateTokens({ ...answers, darkModeEnabled: false });
  const darkTokens = generateTokens({ ...answers, darkModeEnabled: true });

  const form = (
    <FormSection title="Theming" description="Enable dark mode in your token output.">
      <ToggleRow
        label="Enable dark mode"
        description="Tokens and previews use a dark palette when enabled."
        value={answers.darkModeEnabled}
        onValueChange={value => updateAnswer('darkModeEnabled', value)}
      />
    </FormSection>
  );

  const preview = (
    <PreviewFrame>
      <View style={{ gap: tokens.spacing.md }}>
        <TokenButton label={answers.darkModeEnabled ? 'Dark mode on' : 'Light mode'} />
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <ThemePanel label="Light" appName={answers.appName} tokens={lightTokens} />
          <ThemePanel label="Dark" appName={answers.appName} tokens={darkTokens} />
        </View>
      </View>
    </PreviewFrame>
  );

  return (
    <ScreenShell
      title="Theming"
      subtitle="Compare light and dark surfaces side by side.">
      <SplitScreenLayout form={form} preview={preview} />
    </ScreenShell>
  );
}
