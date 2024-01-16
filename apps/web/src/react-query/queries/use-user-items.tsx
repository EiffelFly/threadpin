"use client";

import { listUserItemsQuery } from "@/supabase-query/queries/listUserItemsQuery";
import { Nullable, TypedSupabaseClient } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserItems({
  client,
  userID,
  enabled,
}: {
  client: TypedSupabaseClient;
  userID: Nullable<string>;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["users", userID, "items"],
    enabled: enabled && !!userID,
    queryFn: async () => {
      if (!userID) {
        throw new Error("userID is not provided");
      }

      return await listUserItemsQuery(client, userID);
    },
  });
}
