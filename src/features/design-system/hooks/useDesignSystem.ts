import { useContext } from 'react';

import { DesignSystemContext } from '@/features/design-system/context/DesignSystemContext';

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);

  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }

  return context;
}
