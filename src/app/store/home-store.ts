import { create } from 'zustand';

interface HomeState {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export const useHomeStore = create<HomeState>()((set) => ({
  showSidebar: false,
  setShowSidebar: (value) => set(() => ({ showSidebar: value })),
}));
