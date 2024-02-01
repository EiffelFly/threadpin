import { listUserStickersQuery } from "@/supabase-query/queries/list-user-stickers";
import { Nullable, TypedSupabaseClient } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export async function fetchUserStickers({
  user_uid,
  supabaseClient,
}: {
  user_uid: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
}) {
  if (!user_uid) {
    throw new Error("user_uid is not provided");
  }

  const { data, error } = await listUserStickersQuery(supabaseClient, user_uid);

  if (error) {
    throw error;
  }

  return data;
}

export function getUseUserStickersQueryKey(user_uid: Nullable<string>) {
  return ["users", user_uid, "stickers"];
}

export function prefetchUserStickers({
  user_uid,
  supabaseClient,
  queryClient,
}: {
  user_uid: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
  queryClient: QueryClient;
}) {
  const queryKey = getUseUserStickersQueryKey(user_uid);

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchUserStickers({ supabaseClient, user_uid });
    },
  });
}
