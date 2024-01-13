create policy "Enable select for authenticated users only"
on "public"."items"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."list_items"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."lists"
as permissive
for select
to authenticated
using (true);



