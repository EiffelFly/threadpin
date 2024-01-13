create type "public"."Visibility" as enum ('VISIBILITY_PUBLIC', 'VISIBILITY_PRIVATE', 'VISIBILITY_UNSPECIFIED');

create table "public"."items" (
    "uid" uuid not null default gen_random_uuid(),
    "url" text not null,
    "user_id" uuid default auth.uid(),
    "name" text not null,
    "og_image" text,
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."items" enable row level security;

create table "public"."list_items" (
    "uid" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "list_uid" uuid not null,
    "item_uid" uuid not null,
    "user_id" uuid default auth.uid()
);


alter table "public"."list_items" enable row level security;

create table "public"."lists" (
    "uid" uuid not null default gen_random_uuid(),
    "id" text not null,
    "user_id" uuid default auth.uid(),
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "visibility" "Visibility" default 'VISIBILITY_UNSPECIFIED'::"Visibility"
);


alter table "public"."lists" enable row level security;

create table "public"."profiles" (
    "uid" uuid not null default gen_random_uuid(),
    "id" character varying not null,
    "first_name" character varying,
    "last_name" character varying,
    "user_id" uuid default auth.uid(),
    "avatar_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX items_pkey ON public.items USING btree (uid);

CREATE UNIQUE INDEX list_items_pkey ON public.list_items USING btree (list_uid, item_uid);

CREATE UNIQUE INDEX lists_pkey ON public.lists USING btree (uid);

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (uid);

alter table "public"."items" add constraint "items_pkey" PRIMARY KEY using index "items_pkey";

alter table "public"."list_items" add constraint "list_items_pkey" PRIMARY KEY using index "list_items_pkey";

alter table "public"."lists" add constraint "lists_pkey" PRIMARY KEY using index "lists_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."list_items" add constraint "list_items_item_uid_fkey" FOREIGN KEY (item_uid) REFERENCES items(uid) ON DELETE CASCADE not valid;

alter table "public"."list_items" validate constraint "list_items_item_uid_fkey";

alter table "public"."list_items" add constraint "list_items_list_uid_fkey" FOREIGN KEY (list_uid) REFERENCES lists(uid) ON DELETE CASCADE not valid;

alter table "public"."list_items" validate constraint "list_items_list_uid_fkey";

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

grant delete on table "public"."items" to "anon";

grant insert on table "public"."items" to "anon";

grant references on table "public"."items" to "anon";

grant select on table "public"."items" to "anon";

grant trigger on table "public"."items" to "anon";

grant truncate on table "public"."items" to "anon";

grant update on table "public"."items" to "anon";

grant delete on table "public"."items" to "authenticated";

grant insert on table "public"."items" to "authenticated";

grant references on table "public"."items" to "authenticated";

grant select on table "public"."items" to "authenticated";

grant trigger on table "public"."items" to "authenticated";

grant truncate on table "public"."items" to "authenticated";

grant update on table "public"."items" to "authenticated";

grant delete on table "public"."items" to "service_role";

grant insert on table "public"."items" to "service_role";

grant references on table "public"."items" to "service_role";

grant select on table "public"."items" to "service_role";

grant trigger on table "public"."items" to "service_role";

grant truncate on table "public"."items" to "service_role";

grant update on table "public"."items" to "service_role";

grant delete on table "public"."list_items" to "anon";

grant insert on table "public"."list_items" to "anon";

grant references on table "public"."list_items" to "anon";

grant select on table "public"."list_items" to "anon";

grant trigger on table "public"."list_items" to "anon";

grant truncate on table "public"."list_items" to "anon";

grant update on table "public"."list_items" to "anon";

grant delete on table "public"."list_items" to "authenticated";

grant insert on table "public"."list_items" to "authenticated";

grant references on table "public"."list_items" to "authenticated";

grant select on table "public"."list_items" to "authenticated";

grant trigger on table "public"."list_items" to "authenticated";

grant truncate on table "public"."list_items" to "authenticated";

grant update on table "public"."list_items" to "authenticated";

grant delete on table "public"."list_items" to "service_role";

grant insert on table "public"."list_items" to "service_role";

grant references on table "public"."list_items" to "service_role";

grant select on table "public"."list_items" to "service_role";

grant trigger on table "public"."list_items" to "service_role";

grant truncate on table "public"."list_items" to "service_role";

grant update on table "public"."list_items" to "service_role";

grant delete on table "public"."lists" to "anon";

grant insert on table "public"."lists" to "anon";

grant references on table "public"."lists" to "anon";

grant select on table "public"."lists" to "anon";

grant trigger on table "public"."lists" to "anon";

grant truncate on table "public"."lists" to "anon";

grant update on table "public"."lists" to "anon";

grant delete on table "public"."lists" to "authenticated";

grant insert on table "public"."lists" to "authenticated";

grant references on table "public"."lists" to "authenticated";

grant select on table "public"."lists" to "authenticated";

grant trigger on table "public"."lists" to "authenticated";

grant truncate on table "public"."lists" to "authenticated";

grant update on table "public"."lists" to "authenticated";

grant delete on table "public"."lists" to "service_role";

grant insert on table "public"."lists" to "service_role";

grant references on table "public"."lists" to "service_role";

grant select on table "public"."lists" to "service_role";

grant trigger on table "public"."lists" to "service_role";

grant truncate on table "public"."lists" to "service_role";

grant update on table "public"."lists" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."items"
as permissive
for insert
to authenticated
with check (true);



