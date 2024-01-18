import { useSupabaseBrowser } from "@/lib/utils";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLists, getUseUserListsQueryKey } from "./server";

export function useUserLists({
  userID,
  enabled,
}: {
  userID: Nullable<string>;
  enabled: boolean;
}) {
  const client = useSupabaseBrowser();
  const queryKey = getUseUserListsQueryKey(userID);
  return useQuery({
    queryKey,
    enabled: enabled && !!userID,
    queryFn: async () => {
      return await fetchUserLists({ client, userID });
    },
  });
}
