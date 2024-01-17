"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { listUserListItemQuery } from "@/supabase-query";
import { ClientUserListItem, Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserListItems({
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
    queryKey: ["users", userID, "lists", listID, "items"],
    enabled: enabled && !!userID && !!listID,
    queryFn: async () => {
      if (!userID) {
        throw new Error("userID is not provided");
      }

      if (!listID) {
        throw new Error("listID is not provided");
      }

      const { data, error } = await listUserListItemQuery(
        client,
        userID,
        listID
      );

      if (error) {
        throw error;
      }

      return data as ClientUserListItem[];
    },
  });
}
