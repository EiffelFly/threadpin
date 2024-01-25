import { NodeData, Nullable } from "@/types";
import { Edge, Node, OnEdgesChange, OnNodesChange } from "reactflow";
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

export type PinStore = DialogSlice & WorldSlice;

export type StoreMutators = [
  ["zustand/devtools", never],
  ["zustand/subscribeWithSelector", never],
];

export type WorldSlice = {
  nodes: Node<NodeData>[];
  updateNodes: (fn: (prev: Node<NodeData>[]) => Node<NodeData>[]) => void;
  edges: Edge[];
  updateEdges: (fn: (prev: Edge[]) => Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
};
