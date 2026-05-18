import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  DEFAULT_ANSWERS,
  type Answers,
} from '@/features/design-system/types/answers.types';
import type { Tokens } from '@/features/design-system/types/tokens.types';
import { generateTokens } from '@/features/design-system/utils/generateTokens';

export interface DesignSystemContextValue {
  answers: Answers;
  tokens: Tokens;
  updateAnswer: <K extends keyof Answers>(field: K, value: Answers[K]) => void;
  updateAnswers: (partial: Partial<Answers>) => void;
  resetAnswers: () => void;
}

export const DesignSystemContext = createContext<DesignSystemContextValue | null>(
  null,
);

interface DesignSystemProviderProps {
  children: ReactNode;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);

  const tokens = useMemo(() => generateTokens(answers), [answers]);

  const updateAnswer = useCallback(
    <K extends keyof Answers>(field: K, value: Answers[K]) => {
      setAnswers(previous => ({ ...previous, [field]: value }));
    },
    [],
  );

  const updateAnswers = useCallback((partial: Partial<Answers>) => {
    setAnswers(previous => ({ ...previous, ...partial }));
  }, []);

  const resetAnswers = useCallback(() => {
    setAnswers(DEFAULT_ANSWERS);
  }, []);

  const value = useMemo(
    () => ({
      answers,
      tokens,
      updateAnswer,
      updateAnswers,
      resetAnswers,
    }),
    [answers, tokens, updateAnswer, updateAnswers, resetAnswers],
  );

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}
