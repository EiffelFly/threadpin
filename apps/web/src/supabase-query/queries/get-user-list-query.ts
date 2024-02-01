import { TypedSupabaseClient } from "@/types";

export async function getUserListQuery(
  client: TypedSupabaseClient,
  listID: string
) {
  return await client
    .from("list_items")
    .select(
      `
  created_at,
  description,
  id,
  uid,
  updated_at,
  user_uid,
  visibility,
  items (id, name, uid, title, description, url, og_image, created_at, updated_at, user_uid)
`
    )
    .eq("uid", listID);
}
