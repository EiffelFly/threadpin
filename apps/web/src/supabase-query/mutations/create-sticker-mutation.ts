import { TypedSupabaseClient } from "@/types";
import { Database } from "@/types/database.types";

export type CreateStickerPayload = {
  id: string;
  uid?: string;
  description?: string;
  visibility: Database["public"]["Enums"]["Visibility"];
  asset_url: string;
};

export async function createStickerMutation(
  client: TypedSupabaseClient,
  payload: CreateStickerPayload
) {
  return await client.from("stickers").insert(payload).select();
}
