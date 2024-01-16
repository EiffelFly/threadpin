import { TypedSupabaseClient } from "@/types";

export async function listUserItemsQuery(
  client: TypedSupabaseClient,
  userID: string
) {
  return await client.from("items").select("*").eq("user_id", userID);
}
