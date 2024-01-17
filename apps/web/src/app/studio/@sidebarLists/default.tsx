import { List } from "@/components/studio-sidebar/list";
import { listUserListsQuery } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const lists = await listUserListsQuery(supabase, user.id);

  return (
    <div className="flex w-full flex-col gap-y-4 px-4 py-3">
      {lists.data?.map((list) => {
        return <List id={list.id} uid={list.uid} />;
      })}
    </div>
  );
}
