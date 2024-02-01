import { TypedSupabaseClient } from "@/types";

export async function listUserListItemsQuery(
  client: TypedSupabaseClient,
  user_uid: string,
  list_id: string
) {
  return await client
    .from("list_items")
    .select(
      `
    uid,
    user_uid,
    items (*)
  `
    )
    .eq("user_uid", user_uid)
    .eq("list_uid", list_id);
}
