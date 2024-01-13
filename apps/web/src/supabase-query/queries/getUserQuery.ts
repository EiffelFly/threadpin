import { TypedSupabaseClient } from "@/types";

export async function getUserQuery(client: TypedSupabaseClient) {
  return await client.auth.getUser();
}
