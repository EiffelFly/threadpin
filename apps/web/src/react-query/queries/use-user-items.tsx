"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { listUserItemsQuery } from "@/supabase-query/queries/list-user-items-query";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserItems({
  userID,
  enabled,
}: {
  userID: Nullable<string>;
  enabled: boolean;
}) {
  const client = useSupabaseBrowser();
  return useQuery({
    queryKey: ["users", userID, "items"],
    enabled: enabled && !!userID,
    queryFn: async () => {
      if (!userID) {
        throw new Error("userID is not provided");
      }

      const { data, error } = await listUserItemsQuery(client, userID);

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
