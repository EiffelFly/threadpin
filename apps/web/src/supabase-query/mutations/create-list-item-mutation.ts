import { TypedSupabaseClient } from "@/types";

export type CreateListItemPayload = {
  list_uid: string;
  item_uid: string;
};

export async function createListItemMutation(
  client: TypedSupabaseClient,
  payload: CreateListItemPayload
) {
  return await client.from("list_items").insert(payload);
}
