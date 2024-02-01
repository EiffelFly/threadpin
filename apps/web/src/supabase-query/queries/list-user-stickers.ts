import { TypedSupabaseClient } from "@/types";

export async function listUserStickersQuery(
  client: TypedSupabaseClient,
  user_uid: string
) {
  return await client.from("stickers").select("*").eq("user_uid", user_uid);
}
