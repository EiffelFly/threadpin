"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { deleteStickerMutation } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserStickersQueryKey } from "../queries/use-user-stickers";

export function useDeleteSticker() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      uid,
      user_uid,
    }: {
      uid: string;
      user_uid: string;
    }) => {
      const { error } = await deleteStickerMutation({ client, uid });

      if (error) {
        throw error;
      }

      return { uid, user_uid };
    },
    onSuccess: ({ uid, user_uid }) => {
      const queryKey = getUseUserStickersQueryKey(user_uid);
      queryClient.setQueryData<
        Database["public"]["Tables"]["stickers"]["Row"][]
      >(queryKey, (old) => {
        if (!old) {
          return [];
        }

        return old.filter((sticker) => sticker.uid !== uid);
      });
    },
  });
}
