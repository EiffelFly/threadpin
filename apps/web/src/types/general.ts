import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export type Nullable<T> = T | null;

export type GeneralRecord = Record<string, any>;

export type ItemsDisplayMode = "rich" | "simple";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type SelectOption = {
  label: string;
  value: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export type ClientUserListItem = Pick<
  Database["public"]["Tables"]["list_items"]["Row"],
  "uid" | "user_id"
> & { items: Nullable<Database["public"]["Tables"]["items"]["Row"]> };

export type NodeType = "sticker_node";

export type StickerNodeData = {
  sticker_uid: Nullable<string>;
  sticker: Nullable<Sticker>;
  list_uid: Nullable<string>;
  list: Nullable<List>;
};

export type NodeData = StickerNodeData;

export type Sticker = Database["public"]["Tables"]["stickers"]["Row"];
export type List = Database["public"]["Tables"]["lists"]["Row"];
export type ListItem = Database["public"]["Tables"]["list_items"]["Row"];
export type Item = Database["public"]["Tables"]["items"]["Row"];
