import { StateCreator } from "zustand";
import { DialogSlice, Store, StoreMutators } from "./type";

export const createDialogSlice: StateCreator<
  Store,
  StoreMutators,
  [],
  DialogSlice
> = (set) => ({
  processingURLDrawerState: {
    open: false,
    url: null,
  },
  updateProcessingURLDrawerState: (fn) =>
    set((state) => ({
      processingURLDrawerState: fn(state.processingURLDrawerState),
    })),
});
