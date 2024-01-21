import { listUserStickersQuery } from "@/supabase-query/queries/list-user-stickers";
import { Nullable, TypedSupabaseClient } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export async function fetchUserStickers({
  user_id,
  supabaseClient,
}: {
  user_id: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
}) {
  if (!user_id) {
    throw new Error("user_id is not provided");
  }

  const { data, error } = await listUserStickersQuery(supabaseClient, user_id);

  if (error) {
    throw error;
  }

  return data;
}

export function getUseUserStickersQueryKey(user_id: Nullable<string>) {
  return ["users", user_id, "stickers"];
}

export function prefetchUserStickers({
  user_id,
  supabaseClient,
  queryClient,
}: {
  user_id: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
  queryClient: QueryClient;
}) {
  const queryKey = getUseUserStickersQueryKey(user_id);

  return queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchUserStickers({ supabaseClient, user_id });
    },
  });
}
