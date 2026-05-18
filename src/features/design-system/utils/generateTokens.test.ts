import { DEFAULT_ANSWERS } from '@/features/design-system/types/answers.types';
import { generateTokens } from '@/features/design-system/utils/generateTokens';

describe('generateTokens', () => {
  it('derives primary color tokens from answers', () => {
    const tokens = generateTokens({
      ...DEFAULT_ANSWERS,
      primaryColor: '#4f46e5',
    });

    expect(tokens.color.primary).toBe('#4f46e5');
    expect(tokens.color.onPrimary).toMatch(/^#/);
    expect(tokens.spacing.md).toBeGreaterThan(0);
  });

  it('switches palette when dark mode is enabled', () => {
    const light = generateTokens({ ...DEFAULT_ANSWERS, darkModeEnabled: false });
    const dark = generateTokens({ ...DEFAULT_ANSWERS, darkModeEnabled: true });

    expect(light.isDark).toBe(false);
    expect(dark.isDark).toBe(true);
    expect(dark.color.background).not.toBe(light.color.background);
  });
});
