import { listUserListItemsQuery } from "@/supabase-query";
import { ClientUserListItem, Nullable, TypedSupabaseClient } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export async function fetchUserListItems({
  userID,
  listID,
  supabaseClient,
}: {
  userID: Nullable<string>;
  listID: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
}) {
  if (!userID) {
    throw new Error("userID is not provided");
  }

  if (!listID) {
    throw new Error("listID is not provided");
  }

  const { data, error } = await listUserListItemsQuery(
    supabaseClient,
    userID,
    listID
  );

  if (error) {
    throw error;
  }

  return data as ClientUserListItem[];
}

export function getUseUserListItemsQueryKey(
  userID: Nullable<string>,
  listID: Nullable<string>
) {
  return ["users", userID, "lists", listID, "items"];
}

export function prefetchUserListItems({
  userID,
  listID,
  supabaseClient,
  queryClient,
}: {
  userID: Nullable<string>;
  listID: Nullable<string>;
  supabaseClient: TypedSupabaseClient;
  queryClient: QueryClient;
}) {
  const queryKey = getUseUserListItemsQueryKey(userID, listID);
  return queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchUserListItems({
        supabaseClient,
        userID,
        listID,
      });
    },
  });
}
