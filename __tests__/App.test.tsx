/**
 * @format
 */

import { DEFAULT_ANSWERS } from '@/features/design-system/types/answers.types';
import { exportDesignSystem } from '@/features/design-system/utils/exportDesignSystem';
import { generateTokens } from '@/features/design-system/utils/generateTokens';

test('export pipeline produces markdown for the default system', () => {
  const tokens = generateTokens(DEFAULT_ANSWERS);
  const markdown = exportDesignSystem('markdown', DEFAULT_ANSWERS, tokens);

  expect(markdown).toContain('DesignForge');
  expect(markdown).toContain('primary');
});
