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
