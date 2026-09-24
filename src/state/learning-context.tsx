import { createContext, use, useEffect, useMemo, useState } from "react";
import type { CefrLevel } from "@/data/curriculum";
import { readStorage, writeStorage } from "@/utils/storage";

type PersistedLearningState = {
  currentLevel: CefrLevel;
  completedModuleIds: string[];
  favoriteWordIds: string[];
  masteredWordIds: string[];
  xp: number;
  streak: number;
  practiceSessions: number;
  correctAnswers: number;
  totalAnswers: number;
};

type LearningState = PersistedLearningState & {
  setCurrentLevel: (level: CefrLevel) => void;
  completeModule: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleMastered: (id: string) => void;
  finishPractice: (correct: number, total: number, wordIds: string[]) => void;
};

const STORAGE_KEY = "nemischa.learning.v2";
const initialState: PersistedLearningState = {
  currentLevel: "A1",
  completedModuleIds: [],
  favoriteWordIds: [],
  masteredWordIds: [],
  xp: 0,
  streak: 0,
  practiceSessions: 0,
  correctAnswers: 0,
  totalAnswers: 0,
};

const LearningContext = createContext<LearningState | null>(null);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedLearningState>(() =>
    readStorage(STORAGE_KEY, initialState),
  );

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);
  }, [state]);

  const value = useMemo<LearningState>(
    () => ({
      ...state,
      setCurrentLevel: (currentLevel) => setState((current) => ({ ...current, currentLevel })),
      completeModule: (id) =>
        setState((current) => {
          if (current.completedModuleIds.includes(id)) return current;
          return {
            ...current,
            completedModuleIds: [...current.completedModuleIds, id],
            xp: current.xp + 50,
            streak: Math.max(1, current.streak),
          };
        }),
      toggleFavorite: (id) =>
        setState((current) => ({
          ...current,
          favoriteWordIds: current.favoriteWordIds.includes(id)
            ? current.favoriteWordIds.filter((wordId) => wordId !== id)
            : [...current.favoriteWordIds, id],
        })),
      toggleMastered: (id) =>
        setState((current) => ({
          ...current,
          masteredWordIds: current.masteredWordIds.includes(id)
            ? current.masteredWordIds.filter((wordId) => wordId !== id)
            : [...current.masteredWordIds, id],
        })),
      finishPractice: (correct, total, wordIds) =>
        setState((current) => ({
          ...current,
          xp: current.xp + correct * 10,
          streak: Math.max(1, current.streak),
          practiceSessions: current.practiceSessions + 1,
          correctAnswers: current.correctAnswers + correct,
          totalAnswers: current.totalAnswers + total,
          masteredWordIds: [
            ...new Set([
              ...current.masteredWordIds,
              ...(correct === total ? wordIds : []),
            ]),
          ],
        })),
    }),
    [state],
  );

  return <LearningContext value={value}>{children}</LearningContext>;
}

export function useLearning() {
  const value = use(LearningContext);
  if (!value) throw new Error("useLearning LearningProvider ichida ishlatilishi kerak");
  return value;
}
