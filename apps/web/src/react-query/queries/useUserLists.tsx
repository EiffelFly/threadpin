"use client";

import { listUserListsQuery } from "@/supabase-query/queries/listUserListsQuery";
import { Nullable, TypedSupabaseClient } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserLists({
  client,
  userID,
  enabled,
}: {
  client: TypedSupabaseClient;
  userID: Nullable<string>;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["users", userID, "lists"],
    enabled: enabled && !!userID,
    queryFn: async () => {
      if (!userID) {
        throw new Error("userID is not provided");
      }

      return await listUserListsQuery(client, userID);
    },
  });
}
