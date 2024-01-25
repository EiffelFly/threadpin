import { Button } from "@/components/ui/button";
import { PaintBucketIcon } from "../../ui/extra-icons/PaintBucketIcon";
import { SelectStickerDialog } from "./select-sticker-dialog";

export function Control() {
  return (
    <div className="border-border bg-background flex flex-row border p-2 shadow">
      <SelectStickerDialog />
    </div>
  );
}
