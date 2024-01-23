"use client";

import * as React from "react";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useDeleteSticker } from "@/react-query/mutations/use-delete-sticker";
import { toastError } from "@/lib/toast-error";
import { useUserMe } from "@/react-query";
import { toast } from "sonner";

export function Sticker({
  asset_url,
  id,
  uid,
}: {
  asset_url: string;
  id: string;
  uid: string;
}) {
  const me = useUserMe({ enabled: true });
  const deleteSticker = useDeleteSticker();
  const handleDelete = React.useCallback(async () => {
    if (!me.isSuccess) {
      return;
    }

    try {
      fetch("/api/r2", {
        method: "DELETE",
        body: JSON.stringify({ key: uid }),
      });
    } catch (error) {
      toastError("Failed to delete sticker");
      return;
    }

    try {
      await deleteSticker.mutateAsync({ user_id: me.data.user.id, uid });
      toast.success("Sticker deleted");
    } catch (error) {
      toastError("Failed to delete sticker");
    }
  }, [uid, me.isSuccess, me.data]);

  return (
    <div className="border-border group relative flex flex-col gap-y-4 rounded-lg border p-2 px-4">
      <button
        onClick={handleDelete}
        className="absolute right-4 top-4 p-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <Cross1Icon className="h-4 w-3" />
      </button>
      <div className="flex h-[200px] w-[200px] shrink-0 grow-0">
        {/* <Image className="object-contain" fill src={ogImage} alt={title} /> */}
        <img className="object-contain" src={asset_url} alt={id} />
      </div>
      <p className="typography-p text-muted">{id}</p>
    </div>
  );
}
