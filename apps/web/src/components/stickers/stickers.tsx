"use client";

import { useUserMe } from "@/react-query";
import { useUserStickers } from "@/react-query/queries/use-user-stickers";
import { Sticker } from "./sticker";
import { StickerLoading } from "./sticker-loading";
import { CreateStickerDiaglog } from "./create-sticker-dialog";

export function Stickers() {
  const me = useUserMe({ enabled: true });
  const stickers = useUserStickers({
    user_uid: me.isSuccess ? me.data.user.id : null,
    enabled: me.isSuccess,
  });

  return stickers.isSuccess ? (
    <div className="flex w-full flex-col">
      <div className="mb-8 flex w-full justify-end gap-x-2">
        <CreateStickerDiaglog />
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {stickers.data.map((sticker) => (
          <Sticker
            id={sticker.id}
            uid={sticker.uid}
            asset_url={sticker.asset_url}
          />
        ))}
      </div>
    </div>
  ) : (
    <StickerLoading />
  );
}
