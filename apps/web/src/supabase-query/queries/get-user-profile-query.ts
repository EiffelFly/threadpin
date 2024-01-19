import { TypedSupabaseClient } from "@/types";

export async function getUserProfileQuery(
  client: TypedSupabaseClient,
  user_id: string
) {
  return await client
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();
}
