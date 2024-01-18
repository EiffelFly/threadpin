import { listUserListsQuery } from "@/supabase-query";
import { Nullable, TypedSupabaseClient } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export async function fetchUserLists({
  client,
  userID,
}: {
  client: TypedSupabaseClient;
  userID: Nullable<string>;
}) {
  if (!userID) {
    throw new Error("userID is not provided");
  }

  const { data, error } = await listUserListsQuery(client, userID);

  if (error) {
    throw error;
  }

  return data;
}

export function getUseUserListsQueryKey(userID: Nullable<string>) {
  return ["users", userID, "lists"];
}

export function prefetchUserLists({
  userID,
  supabaseClient,
  queryClient,
}: {
  userID: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
  queryClient: QueryClient;
}) {
  return queryClient.prefetchQuery({
    queryKey: ["users", userID, "lists"],
    queryFn: async () => {
      return await fetchUserLists({ client: supabaseClient, userID });
    },
  });
}
