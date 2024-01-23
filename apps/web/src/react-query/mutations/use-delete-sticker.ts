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
    mutationFn: async ({ uid, user_id }: { uid: string; user_id: string }) => {
      const { error } = await deleteStickerMutation({ client, uid });

      if (error) {
        throw error;
      }

      return { uid, user_id };
    },
    onSuccess: ({ uid, user_id }) => {
      const queryKey = getUseUserStickersQueryKey(user_id);
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
