"use client";

import { create } from "zustand";
import type { SkinConcern, SkinType } from "@/types";

interface QuizState {
  /** 0 = skin type, 1 = concern, 2 = result. */
  step: number;
  skinType: SkinType | null;
  concern: SkinConcern | null;

  selectSkinType: (value: SkinType) => void;
  selectConcern: (value: SkinConcern) => void;
  goBack: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  step: 0,
  skinType: null,
  concern: null,

  // Selecting an answer auto-advances — one tap per step keeps the quiz
  // completion rate high, which is the whole point of the widget.
  selectSkinType: (value) => set({ skinType: value, step: 1 }),
  selectConcern: (value) => set({ concern: value, step: 2 }),

  goBack: () => set((state) => ({ step: Math.max(0, state.step - 1) })),
  reset: () => set({ step: 0, skinType: null, concern: null }),
}));
