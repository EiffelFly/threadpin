"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import {
  CreateListItemPayload,
  createListItemMutation,
} from "@/supabase-query";
import { ClientUserListItem } from "@/types";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateListItem() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      payload,
      userID,
    }: {
      payload: CreateListItemPayload;
      userID: string;
    }) => {
      const { data, error } = await createListItemMutation(client, payload);

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], userID };
    },
    onSuccess: ({ data, userID }) => {
      queryClient.setQueryData<ClientUserListItem[]>(
        ["users", userID, "items"],
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
