"use client";

import { CreateItemPayload, createItemMutation } from "@/supabase-query";
import { Nullable, TypedSupabaseClient } from "@/types";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      client,
      payload,
      userID,
    }: {
      client: TypedSupabaseClient;
      payload: CreateItemPayload;
      userID: string;
    }) => {
      const { data, error } = await createItemMutation(client, payload);

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], userID };
    },
    onSuccess: ({ data, userID }) => {
      queryClient.setQueryData<Database["public"]["Tables"]["items"]["Row"][]>(
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
