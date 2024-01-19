import { useSupabaseBrowser } from "@/lib/utils";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile, getUseUserProfileQueryKey } from "./server";

export function useUserProfile({
  user_id,
  enabled,
}: {
  user_id: Nullable<string>;
  enabled: boolean;
}) {
  const supabaseClient = useSupabaseBrowser();
  const queryKey = getUseUserProfileQueryKey(user_id);
  return useQuery({
    queryKey,
    enabled: enabled && !!user_id,
    queryFn: async () => {
      return await fetchUserProfile({ supabaseClient, user_id });
    },
  });
}
