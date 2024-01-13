"use client";

import { getUserListQuery } from "@/supabase-query/queries/getUserListQuery";
import { Nullable, TypedSupabaseClient } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserList({
  client,
  userID,
  listID,
  enabled,
}: {
  client: TypedSupabaseClient;
  userID: Nullable<string>;
  listID: Nullable<string>;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["users", userID, "lists", listID],
    enabled: enabled && !!userID && !!listID,
    queryFn: async () => {
      if (!userID) {
        throw new Error("userID is not provided");
      }

      if (!listID) {
        throw new Error("listID is not provided");
      }

      return await getUserListQuery(client, listID);
    },
  });
}
