"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { deleteListMutation } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserListsQueryKey } from "../queries/use-user-lists";

export function useDeleteList() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      list_uid,
      user_id,
    }: {
      list_uid: string;
      user_id: string;
    }) => {
      const { error } = await deleteListMutation({ client, list_uid });

      if (error) {
        throw error;
      }

      return { list_uid, user_id };
    },
    onSuccess: ({ list_uid, user_id }) => {
      const useUserListsQueryKey = getUseUserListsQueryKey(user_id);
      queryClient.setQueryData<Database["public"]["Tables"]["lists"]["Row"][]>(
        useUserListsQueryKey,
        (old) => {
          if (!old) {
            return [];
          }

          return old.filter((list) => list.uid !== list_uid);
        }
      );
    },
  });
}
