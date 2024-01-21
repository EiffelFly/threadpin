import { TypedSupabaseClient } from "@/types";

export async function listUserStickersQuery(
  client: TypedSupabaseClient,
  user_id: string
) {
  return await client.from("stickers").select("*").eq("user_id", user_id);
}
