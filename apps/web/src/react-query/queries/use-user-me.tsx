"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { getUserQuery } from "@/supabase-query/queries/get-user-query";
import { useQuery } from "@tanstack/react-query";

export function useUserMe({ enabled }: { enabled: boolean }) {
  const client = useSupabaseBrowser();
  return useQuery({
    queryKey: ["users", "me"],
    enabled: enabled,
    queryFn: async () => {
      return await getUserQuery(client);
    },
  });
}
