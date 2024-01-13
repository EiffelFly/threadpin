create policy "Enable delete for users based on user_id"
on "public"."items"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can update their own items"
on "public"."items"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "Enable delete for users based on user_id"
on "public"."list_items"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."list_items"
as permissive
for insert
to authenticated
with check (true);


create policy "User can update their owned list_items"
on "public"."list_items"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "Enable delete for users based on user_id"
on "public"."lists"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."lists"
as permissive
for insert
to authenticated
with check (true);


create policy "User can update their own lists"
on "public"."lists"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "Enable delete for users based on user_id"
on "public"."profiles"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "User can update their owned profile"
on "public"."profiles"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));



