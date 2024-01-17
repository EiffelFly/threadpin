"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { listUserListsQuery } from "@/supabase-query/queries/list-user-lists-query";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserLists({
  userID,
  enabled,
}: {
  userID: Nullable<string>;
  enabled: boolean;
}) {
  const client = useSupabaseBrowser();
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
