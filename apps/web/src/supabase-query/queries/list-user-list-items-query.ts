import { TypedSupabaseClient } from "@/types";

export async function listUserListItemQuery(
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
    .eq("list_id", listID);
}
