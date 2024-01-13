import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export type Nullable<T> = T | null;

export type GeneralRecord = Record<string, any>;

export type ItemsDisplayMode = "list" | "rich-list";

export type TypedSupabaseClient = SupabaseClient<Database>;
