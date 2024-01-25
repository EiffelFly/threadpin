"use client";

import ReactFlow, { Background } from "reactflow";
import { Control } from "./control/control";
import { PinStore } from "@/store/type";
import { usePinStore } from "@/store/usePinStore";
import { useShallow } from "zustand/react/shallow";
import { StickerNode } from "./nodes/sticker-node";

const selector = (store: PinStore) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
});

const nodeTypes = { sticker_node: StickerNode };

export function World() {
  const { nodes, edges, onNodesChange, onEdgesChange } = usePinStore(
    useShallow(selector)
  );

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#E9E9F5" />
      </ReactFlow>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Control />
      </div>
    </div>
  );
}
