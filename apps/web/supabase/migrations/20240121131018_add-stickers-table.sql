create table "public"."stickers" (
    "uid" uuid not null default gen_random_uuid(),
    "id" character varying,
    "asset_url" character varying,
    "visibility" "Visibility",
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."stickers" enable row level security;

CREATE UNIQUE INDEX stickers_pkey ON public.stickers USING btree (uid);

alter table "public"."stickers" add constraint "stickers_pkey" PRIMARY KEY using index "stickers_pkey";

grant delete on table "public"."stickers" to "anon";

grant insert on table "public"."stickers" to "anon";

grant references on table "public"."stickers" to "anon";

grant select on table "public"."stickers" to "anon";

grant trigger on table "public"."stickers" to "anon";

grant truncate on table "public"."stickers" to "anon";

grant update on table "public"."stickers" to "anon";

grant delete on table "public"."stickers" to "authenticated";

grant insert on table "public"."stickers" to "authenticated";

grant references on table "public"."stickers" to "authenticated";

grant select on table "public"."stickers" to "authenticated";

grant trigger on table "public"."stickers" to "authenticated";

grant truncate on table "public"."stickers" to "authenticated";

grant update on table "public"."stickers" to "authenticated";

grant delete on table "public"."stickers" to "service_role";

grant insert on table "public"."stickers" to "service_role";

grant references on table "public"."stickers" to "service_role";

grant select on table "public"."stickers" to "service_role";

grant trigger on table "public"."stickers" to "service_role";

grant truncate on table "public"."stickers" to "service_role";

grant update on table "public"."stickers" to "service_role";


