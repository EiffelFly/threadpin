import { TypedSupabaseClient } from "@/types";

export async function listUserListsQuery(
  client: TypedSupabaseClient,
  user_uid: string
) {
  return await client.from("lists").select("*").eq("user_uid", user_uid);
}
