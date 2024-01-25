import * as React from "react";

import { Button } from "@/components/ui/button";
import { PaintBucketIcon } from "@/components/ui/extra-icons/PaintBucketIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserMe } from "@/react-query";
import { useUserStickers } from "@/react-query/queries/use-user-stickers";
import { PinStore } from "@/store/type";
import { usePinStore } from "@/store/usePinStore";
import { useShallow } from "zustand/react/shallow";
import { Sticker } from "@/types";
import { v4 as uuidv4 } from "uuid";

const selector = (store: PinStore) => ({
  updateNodes: store.updateNodes,
});

export function SelectStickerDialog() {
  const [open, setOpen] = React.useState(false);
  const me = useUserMe({ enabled: true });
  const stickers = useUserStickers({
    user_id: me.isSuccess ? me.data.user.id : null,
    enabled: me.isSuccess,
  });

  const { updateNodes } = usePinStore(useShallow(selector));

  function onSelect(sticker: Sticker) {
    const uid = uuidv4();

    updateNodes((nodes) => {
      return [
        ...nodes,
        {
          id: uid,
          type: "sticker_node",
          data: {
            sticker_uid: sticker.uid,
            sticker,
            list_uid: null,
            list: null,
          },
          position: { x: 0, y: 0 },
        },
      ];
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto p-3">
          <PaintBucketIcon className="stroke-primary h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="mb-6">
          <DialogTitle>Pick a sticker</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row flex-wrap gap-4">
          {stickers.isSuccess
            ? stickers.data.map((sticker) => (
                <button
                  onClick={() => onSelect(sticker)}
                  className="relative flex h-[200px] flex-col rounded border"
                >
                  <img
                    className="h-full w-full rounded object-cover"
                    src={sticker.asset_url}
                  />
                </button>
              ))
            : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
