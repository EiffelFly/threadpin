"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { CreateListPayload, createListMutation } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserListsQueryKey } from "../queries/use-user-lists";

export function useCreateList() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      payload,
      userID,
    }: {
      payload: CreateListPayload;
      userID: string;
    }) => {
      const { data, error } = await createListMutation(client, payload);

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], userID };
    },
    onSuccess: ({ data, userID }) => {
      const useUserListsQueryKey = getUseUserListsQueryKey(userID);
      queryClient.setQueryData<Database["public"]["Tables"]["lists"]["Row"][]>(
        useUserListsQueryKey,
        (old) => {
          if (!old) {
            return [data];
          }

          return [...old, data];
        }
      );
    },
  });
}
