import { StateCreator } from "zustand";
import { DialogSlice, PinStore, StoreMutators } from "./type";

export const createDialogSlice: StateCreator<
  PinStore,
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
