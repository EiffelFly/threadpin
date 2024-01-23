import { TypedSupabaseClient } from "@/types";

export async function deleteStickerMutation({
  client,
  uid,
}: {
  client: TypedSupabaseClient;
  uid: string;
}) {
  return await client.from("stickers").delete().eq("uid", uid);
}
