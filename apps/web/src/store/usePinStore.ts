import { create } from "zustand";
import { Store } from "./type";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createDialogSlice } from "./dialog-slice";

export const usePinStore = create<Store>()(
  subscribeWithSelector(
    devtools((...a) => ({
      ...createDialogSlice(...a),
    }))
  )
);
