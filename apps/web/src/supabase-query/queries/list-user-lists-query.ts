import { TypedSupabaseClient } from "@/types";

export async function listUserListsQuery(
  client: TypedSupabaseClient,
  userID: string
) {
  return await client.from("lists").select("*").eq("user_id", userID);
}
