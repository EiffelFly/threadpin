import { TypedSupabaseClient } from "@/types";

export async function getUserProfileQuery(
  client: TypedSupabaseClient,
  user_uid: string
) {
  return await client
    .from("profiles")
    .select("*")
    .eq("user_uid", user_uid)
    .single();
}
