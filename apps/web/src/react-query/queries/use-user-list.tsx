"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { getUserListQuery } from "@/supabase-query/queries/get-user-list-query";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserList({
  userID,
  listID,
  enabled,
}: {
  userID: Nullable<string>;
  listID: Nullable<string>;
  enabled: boolean;
}) {
  const client = useSupabaseBrowser();
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

      const { data, error } = await getUserListQuery(client, listID);

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
