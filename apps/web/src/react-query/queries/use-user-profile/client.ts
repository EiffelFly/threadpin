"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile, getUseUserProfileQueryKey } from "./server";

export function useUserProfile({
  user_uid,
  enabled,
}: {
  user_uid: Nullable<string>;
  enabled: boolean;
}) {
  const supabaseClient = useSupabaseBrowser();
  const queryKey = getUseUserProfileQueryKey(user_uid);
  return useQuery({
    queryKey,
    enabled: enabled && !!user_uid,
    queryFn: async () => {
      return await fetchUserProfile({ supabaseClient, user_uid });
    },
  });
}
