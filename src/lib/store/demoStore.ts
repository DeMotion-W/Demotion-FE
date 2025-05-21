// src/lib/store/demoStore.ts

import { create } from "zustand";

interface DemoSummary {
  demoId: number;
  title: string;
  firstScreenshotUrl: string;
  createdAt: string;
}

interface DemoStore {
  demos: DemoSummary[];
  setDemos: (demos: DemoSummary[]) => void;
  getDemoById: (id: number) => DemoSummary | undefined;
}

export const useDemoStore = create<DemoStore>(
  (set, get) => ({
    demos: [],
    setDemos: (demos) => set({ demos }),
    getDemoById: (id) =>
      get().demos.find((d) => d.demoId === id),
  })
);
