import { TypedSupabaseClient } from "@/types";

export async function deleteListMutation({
  client,
  list_uid,
}: {
  client: TypedSupabaseClient;
  list_uid: string;
}) {
  return await client.from("lists").delete().eq("uid", list_uid);
}
