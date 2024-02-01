"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserStickers, getUseUserStickersQueryKey } from "./server";

export function useUserStickers({
  user_uid,
  enabled,
}: {
  user_uid: Nullable<string>;
  enabled: boolean;
}) {
  const supabaseClient = useSupabaseBrowser();
  const queryKey = getUseUserStickersQueryKey(user_uid);
  return useQuery({
    queryKey,
    enabled: enabled && !!user_uid,
    queryFn: async () => {
      return await fetchUserStickers({ supabaseClient, user_uid });
    },
  });
}
