import { TypedSupabaseClient } from "@/types";

export async function listUserItemsQuery(
  client: TypedSupabaseClient,
  user_uid: string
) {
  return await client.from("items").select("*").eq("user_uid", user_uid);
}
