import { StateCreator } from "zustand";
import { DialogSlice, PinStore, StoreMutators, WorldSlice } from "./type";
import { NodeData } from "@/types";
import {
  EdgeChange,
  Node,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

export const createWorldSlice: StateCreator<
  PinStore,
  StoreMutators,
  [],
  WorldSlice
> = (set, get) => ({
  nodes: [],
  updateNodes: (fn) => set((state) => ({ nodes: fn(state.nodes) })),
  edges: [],
  updateEdges: (fn) => set((state) => ({ edges: fn(state.edges) })),
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
});
