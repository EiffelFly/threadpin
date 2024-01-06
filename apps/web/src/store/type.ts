import { Nullable } from "@/types";
import * as z from "zod";

export const ProcessingURLDrawerDataSchema = z.object({
  title: z.string(),
});

export type ProcessingURLDrawerState = {
  open: boolean;
  url: Nullable<URL>;
};

export type DialogSlice = {
  processingURLDrawerState: ProcessingURLDrawerState;
  updateProcessingURLDrawerState: (
    fn: (prev: ProcessingURLDrawerState) => ProcessingURLDrawerState
  ) => void;
};

export type Store = DialogSlice;

export type StoreMutators = [
  ["zustand/devtools", never],
  ["zustand/subscribeWithSelector", never],
];
