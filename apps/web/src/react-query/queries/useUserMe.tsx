"use client";

import { getUserQuery } from "@/supabase-query/queries/getUserQuery";
import { TypedSupabaseClient } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserMe({
  client,
  enabled,
}: {
  client: TypedSupabaseClient;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["users", "me"],
    enabled: enabled,
    queryFn: async () => {
      return await getUserQuery(client);
    },
  });
}
