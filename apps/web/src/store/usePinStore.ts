import { create } from "zustand";
import { PinStore } from "./type";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createDialogSlice } from "./dialog-slice";
import { createWorldSlice } from "./world-slice";

export const usePinStore = create<PinStore>()(
  subscribeWithSelector(
    devtools((...a) => ({
      ...createDialogSlice(...a),
      ...createWorldSlice(...a),
    }))
  )
);
