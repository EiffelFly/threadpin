create table "public"."item" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "og_image" text,
    "url" text,
    "description" text
);


alter table "public"."item" enable row level security;

create table "public"."list" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "items" text[]
);


alter table "public"."list" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "first_name" text,
    "last_name" text,
    "avatar_url" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX item_pkey ON public.item USING btree (id);

CREATE UNIQUE INDEX list_pkey ON public.list USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."item" add constraint "item_pkey" PRIMARY KEY using index "item_pkey";

alter table "public"."list" add constraint "list_pkey" PRIMARY KEY using index "list_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

grant delete on table "public"."item" to "anon";

grant insert on table "public"."item" to "anon";

grant references on table "public"."item" to "anon";

grant select on table "public"."item" to "anon";

grant trigger on table "public"."item" to "anon";

grant truncate on table "public"."item" to "anon";

grant update on table "public"."item" to "anon";

grant delete on table "public"."item" to "authenticated";

grant insert on table "public"."item" to "authenticated";

grant references on table "public"."item" to "authenticated";

grant select on table "public"."item" to "authenticated";

grant trigger on table "public"."item" to "authenticated";

grant truncate on table "public"."item" to "authenticated";

grant update on table "public"."item" to "authenticated";

grant delete on table "public"."item" to "service_role";

grant insert on table "public"."item" to "service_role";

grant references on table "public"."item" to "service_role";

grant select on table "public"."item" to "service_role";

grant trigger on table "public"."item" to "service_role";

grant truncate on table "public"."item" to "service_role";

grant update on table "public"."item" to "service_role";

grant delete on table "public"."list" to "anon";

grant insert on table "public"."list" to "anon";

grant references on table "public"."list" to "anon";

grant select on table "public"."list" to "anon";

grant trigger on table "public"."list" to "anon";

grant truncate on table "public"."list" to "anon";

grant update on table "public"."list" to "anon";

grant delete on table "public"."list" to "authenticated";

grant insert on table "public"."list" to "authenticated";

grant references on table "public"."list" to "authenticated";

grant select on table "public"."list" to "authenticated";

grant trigger on table "public"."list" to "authenticated";

grant truncate on table "public"."list" to "authenticated";

grant update on table "public"."list" to "authenticated";

grant delete on table "public"."list" to "service_role";

grant insert on table "public"."list" to "service_role";

grant references on table "public"."list" to "service_role";

grant select on table "public"."list" to "service_role";

grant trigger on table "public"."list" to "service_role";

grant truncate on table "public"."list" to "service_role";

grant update on table "public"."list" to "service_role";

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


