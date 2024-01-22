create policy "Enable delete for users based on user_id"
on "public"."stickers"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."stickers"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable select for authenticated users only"
on "public"."stickers"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on user_id"
on "public"."stickers"
as permissive
for update
to public
using ((auth.uid() = user_id));



