import { TypedSupabaseClient } from "@/types";
import { Database } from "@/types/database.types";

export type UpdateUserProfilePayload = Partial<
  Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "avatar_url" | "first_name" | "id" | "last_name" | "lists_order_record"
  >
>;

export async function updateUserProfileMutation({
  client,
  user_id,
  payload,
}: {
  client: TypedSupabaseClient;
  user_id: string;
  payload: UpdateUserProfilePayload;
}) {
  return await client
    .from("profiles")
    .update(payload)
    .eq("user_id", user_id)
    .select();
}
