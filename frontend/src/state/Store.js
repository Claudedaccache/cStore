import { create } from "zustand";

const useStore = create((set) => ({
  headerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height }),
}));

export default useStore;
