import { getUserProfileQuery } from "@/supabase-query/queries/get-user-profile-query";
import { Nullable, TypedSupabaseClient } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export async function fetchUserProfile({
  user_id,
  supabaseClient,
}: {
  user_id: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
}) {
  if (!user_id) {
    throw new Error("user_id is not provided");
  }

  const { data, error } = await getUserProfileQuery(supabaseClient, user_id);

  if (error) {
    throw error;
  }

  return data;
}

export function getUseUserProfileQueryKey(user_id: Nullable<string>) {
  return ["users", user_id, "profile"];
}

export function prefetchUserProfile({
  user_id,
  supabaseClient,
  queryClient,
}: {
  user_id: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
  queryClient: QueryClient;
}) {
  const queryKey = getUseUserProfileQueryKey(user_id);

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchUserProfile({ supabaseClient, user_id });
    },
  });
}
