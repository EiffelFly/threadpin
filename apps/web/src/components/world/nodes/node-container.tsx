import * as React from "react";
import { cn } from "@/lib/utils";

import { PinStore } from "@/store/type";
import { usePinStore } from "@/store/usePinStore";
import { NodeResizer, useUpdateNodeInternals } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { useDragRotatable } from "@/lib/use-drag-rotatable";

const selector = (store: PinStore) => ({
  selectedNodeID: store.selectedNodeID,
  updateSelectedNodeID: store.updateSelectedNodeID,
  updateNodes: store.updateNodes,
});

export function NodeContainer({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const updateNodeInternals = useUpdateNodeInternals();

  const { selectedNodeID, updateSelectedNodeID, updateNodes } = usePinStore(
    useShallow(selector)
  );

  const { rotateObjectRef, transform, listener } = useDragRotatable(() => {
    updateNodeInternals(id);
  });

  return (
    <div
      style={{
        transformOrigin: "center",
        transform,
      }}
      ref={rotateObjectRef}
      className="relative flex"
    >
      <div
        {...listener}
        className={cn(
          "nodrag absolute bottom-0 right-0 flex h-5 w-5 translate-x-full translate-y-full cursor-alias items-center justify-center",
          selectedNodeID === id ? "" : "hidden"
        )}
      >
        <div className="bg-muted-foreground h-2 w-2" />
      </div>
      <NodeResizer keepAspectRatio />
      {selectedNodeID === id ? <React.Fragment></React.Fragment> : null}
      <div
        className="h-full w-full"
        onClick={() => updateSelectedNodeID(() => id)}
      >
        {children}
      </div>
    </div>
  );
}
