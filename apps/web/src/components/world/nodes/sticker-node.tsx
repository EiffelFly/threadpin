import { StickerNodeData } from "@/types";
import { NodeProps } from "reactflow";

export function StickerNode({ data, id }: NodeProps<StickerNodeData>) {
  return (
    <div className="h-[400px] w-[400px]">
      {data.sticker ? <img src={data.sticker.asset_url} /> : null}
    </div>
  );
}
