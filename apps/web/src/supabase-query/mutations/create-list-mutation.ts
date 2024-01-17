import { TypedSupabaseClient } from "@/types";
import { Database } from "@/types/database.types";

export type CreateListPayload = {
  id: string;
  description?: string;
  visibility: Database["public"]["Enums"]["Visibility"];
};

export async function createListMutation(
  client: TypedSupabaseClient,
  payload: CreateListPayload
) {
  return await client
    .from("lists")
    .insert({
      id: payload.id,
      description: payload.description,
      visibility: payload.visibility,
    })
    .select();
}
