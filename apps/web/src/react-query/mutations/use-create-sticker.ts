import { useSupabaseBrowser } from "@/lib/utils";
import {
  CreateStickerPayload,
  createStickerMutation,
} from "@/supabase-query/mutations/create-sticker-mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserStickersQueryKey } from "../queries/use-user-stickers";
import { Database } from "@/types/database.types";

export function useCreateSticker() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      payload,
      user_uid,
    }: {
      payload: CreateStickerPayload;
      user_uid: string;
    }) => {
      const { data, error } = await createStickerMutation(client, payload);

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], user_uid };
    },
    onSuccess: ({ data, user_uid }) => {
      const queryKey = getUseUserStickersQueryKey(user_uid);
      queryClient.setQueryData<
        Database["public"]["Tables"]["stickers"]["Row"][]
      >(queryKey, (old) => {
        if (!old) {
          return [data];
        }

        return [...old, data];
      });
    },
  });
}
