drop policy "Enable delete for users based on user_id" on "public"."items";

drop policy "Users can update their own items" on "public"."items";

drop policy "Enable delete for users based on user_id" on "public"."list_items";

drop policy "User can update their owned list_items" on "public"."list_items";

drop policy "Enable delete for users based on user_id" on "public"."lists";

drop policy "User can update their own lists" on "public"."lists";

drop policy "Enable delete for users based on user_id" on "public"."profiles";

drop policy "User can update their owned profile" on "public"."profiles";

drop policy "Enable delete for users based on user_id" on "public"."stickers";

drop policy "Enable update for users based on user_id" on "public"."stickers";

create table "public"."worlds" (
    "uid" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "recipe" jsonb,
    "user_uid" uuid default auth.uid(),
    "updated_at" timestamp with time zone,
    "id" character varying
);


alter table "public"."worlds" enable row level security;

alter table "public"."items" drop column "user_id";

alter table "public"."items" add column "user_uid" uuid default auth.uid();

alter table "public"."list_items" drop column "user_id";

alter table "public"."list_items" add column "user_uid" uuid default auth.uid();

alter table "public"."lists" drop column "user_id";

alter table "public"."lists" add column "user_uid" uuid default auth.uid();

alter table "public"."profiles" drop column "user_id";

alter table "public"."profiles" add column "user_uid" uuid default auth.uid();

alter table "public"."stickers" drop column "user_id";

alter table "public"."stickers" add column "user_uid" uuid default auth.uid();

CREATE UNIQUE INDEX worlds_pkey ON public.worlds USING btree (uid);

alter table "public"."worlds" add constraint "worlds_pkey" PRIMARY KEY using index "worlds_pkey";

grant delete on table "public"."worlds" to "anon";

grant insert on table "public"."worlds" to "anon";

grant references on table "public"."worlds" to "anon";

grant select on table "public"."worlds" to "anon";

grant trigger on table "public"."worlds" to "anon";

grant truncate on table "public"."worlds" to "anon";

grant update on table "public"."worlds" to "anon";

grant delete on table "public"."worlds" to "authenticated";

grant insert on table "public"."worlds" to "authenticated";

grant references on table "public"."worlds" to "authenticated";

grant select on table "public"."worlds" to "authenticated";

grant trigger on table "public"."worlds" to "authenticated";

grant truncate on table "public"."worlds" to "authenticated";

grant update on table "public"."worlds" to "authenticated";

grant delete on table "public"."worlds" to "service_role";

grant insert on table "public"."worlds" to "service_role";

grant references on table "public"."worlds" to "service_role";

grant select on table "public"."worlds" to "service_role";

grant trigger on table "public"."worlds" to "service_role";

grant truncate on table "public"."worlds" to "service_role";

grant update on table "public"."worlds" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."items"
as permissive
for delete
to public
using ((auth.uid() = user_uid));


create policy "Users can update their own items"
on "public"."items"
as permissive
for update
to authenticated
using ((auth.uid() = user_uid));


create policy "Enable delete for users based on user_id"
on "public"."list_items"
as permissive
for delete
to public
using ((auth.uid() = user_uid));


create policy "User can update their owned list_items"
on "public"."list_items"
as permissive
for update
to authenticated
using ((auth.uid() = user_uid));


create policy "Enable delete for users based on user_id"
on "public"."lists"
as permissive
for delete
to public
using ((auth.uid() = user_uid));


create policy "User can update their own lists"
on "public"."lists"
as permissive
for update
to authenticated
using ((auth.uid() = user_uid));


create policy "Enable delete for users based on user_id"
on "public"."profiles"
as permissive
for delete
to public
using ((auth.uid() = user_uid));


create policy "User can update their owned profile"
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = user_uid));


create policy "Enable delete for users based on user_id"
on "public"."stickers"
as permissive
for delete
to public
using ((auth.uid() = user_uid));


create policy "Enable update for users based on user_id"
on "public"."stickers"
as permissive
for update
to public
using ((auth.uid() = user_uid));



