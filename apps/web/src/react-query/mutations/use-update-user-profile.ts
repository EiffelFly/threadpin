"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import {
  UpdateUserProfilePayload,
  updateUserProfileMutation,
} from "@/supabase-query";
import { Database } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserProfileQueryKey } from "../queries/use-user-profile";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const client = useSupabaseBrowser();
  return useMutation({
    mutationFn: async ({
      payload,
      user_uid,
    }: {
      payload: UpdateUserProfilePayload;
      user_uid: string;
    }) => {
      const { data, error } = await updateUserProfileMutation({
        client,
        user_uid,
        payload,
      });

      if (error) {
        return Promise.reject(error);
      }

      return { data: data[0], user_uid };
    },
    onSuccess: ({ data, user_uid }) => {
      const queryKey = getUseUserProfileQueryKey(user_uid);
      queryClient.setQueryData<Database["public"]["Tables"]["profiles"]["Row"]>(
        queryKey,
        () => {
          return data;
        }
      );
    },
  });
}
