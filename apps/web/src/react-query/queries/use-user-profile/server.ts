import { getUserProfileQuery } from "@/supabase-query/queries/get-user-profile-query";
import { Nullable, TypedSupabaseClient } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export async function fetchUserProfile({
  user_uid,
  supabaseClient,
}: {
  user_uid: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
}) {
  if (!user_uid) {
    throw new Error("user_uid is not provided");
  }

  const { data, error } = await getUserProfileQuery(supabaseClient, user_uid);

  if (error) {
    throw error;
  }

  return data;
}

export function getUseUserProfileQueryKey(user_uid: Nullable<string>) {
  return ["users", user_uid, "profile"];
}

export function prefetchUserProfile({
  user_uid,
  supabaseClient,
  queryClient,
}: {
  user_uid: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
  queryClient: QueryClient;
}) {
  const queryKey = getUseUserProfileQueryKey(user_uid);

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchUserProfile({ supabaseClient, user_uid });
    },
  });
}
