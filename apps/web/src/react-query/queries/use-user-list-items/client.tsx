"use client";

import { useSupabaseBrowser } from "@/lib/utils";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserListItems } from "./server";

export function useUserListItems({
  userID,
  listID,
  enabled,
}: {
  userID: Nullable<string>;
  listID: Nullable<string>;
  enabled: boolean;
}) {
  const supabaseClient = useSupabaseBrowser();
  return useQuery({
    queryKey: ["users", userID, "lists", listID, "items"],
    enabled: enabled && !!userID && !!listID,
    queryFn: async () => {
      return await fetchUserListItems({
        supabaseClient,
        userID,
        listID,
      });
    },
  });
}
