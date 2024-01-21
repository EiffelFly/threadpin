"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import {
  UpdateUserProfilePayload,
  updateUserProfileMutation,
} from "@/supabase-query";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserProfileQueryKey } from "../queries/user-user-profile";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      payload,
      user_id,
    }: {
      payload: UpdateUserProfilePayload;
      user_id: string;
    }) => {
      const { data, error } = await updateUserProfileMutation({
        client,
        user_id,
        payload,
      });

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], user_id };
    },
    onSuccess: ({ data, user_id }) => {
      const queryKey = getUseUserProfileQueryKey(user_id);
      queryClient.setQueryData<Database["public"]["Tables"]["profiles"]["Row"]>(
        queryKey,
        () => {
          return data;
        }
      );
    },
  });
}
