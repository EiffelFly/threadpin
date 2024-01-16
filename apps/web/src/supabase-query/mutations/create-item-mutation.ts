import { TypedSupabaseClient } from "@/types";

export type CreateItemPayload = {
  name: string;
  url: string;
  og_image?: string;
  description?: string;
};

export async function createItemMutation(
  client: TypedSupabaseClient,
  payload: CreateItemPayload
) {
  return await client.from("items").insert(payload).select();
}
