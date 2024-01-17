import { TypedSupabaseClient } from "@/types";

export async function listUserListItemsQuery(
  client: TypedSupabaseClient,
  userID: string,
  listID: string
) {
  return await client
    .from("list_items")
    .select(
      `
    uid,
    user_id,
    items (*)
  `
    )
    .eq("user_id", userID)
    .eq("list_uid", listID);
}
