"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserStickers, getUseUserStickersQueryKey } from "./server";

export function useUserStickers({
  user_id,
  enabled,
}: {
  user_id: Nullable<string>;
  enabled: boolean;
}) {
  const supabaseClient = useSupabaseBrowser();
  const queryKey = getUseUserStickersQueryKey(user_id);
  return useQuery({
    queryKey,
    enabled: enabled && !!user_id,
    queryFn: async () => {
      return await fetchUserStickers({ supabaseClient, user_id });
    },
  });
}
