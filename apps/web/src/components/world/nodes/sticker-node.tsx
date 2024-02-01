import * as React from "react";
import { StickerNodeData } from "@/types";
import { NodeProps, NodeResizer } from "reactflow";
import { NodeContainer } from "./node-container";

export function StickerNode({ data, id }: NodeProps<StickerNodeData>) {
  return (
    <NodeContainer id={id}>
      <div className="flex h-full w-full p-2">
        {data.sticker ? (
          <img
            className="h-full w-full object-fill"
            src={data.sticker.asset_url}
          />
        ) : null}
      </div>
    </NodeContainer>
  );
}
