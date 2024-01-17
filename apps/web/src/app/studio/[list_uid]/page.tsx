import * as React from "react";

import { getUserQuery, listUserListItemsQuery } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Item } from "@/components/studio-content/item";

export default async function Page({
  params,
}: {
  params: { list_uid: string };
}) {
  const client = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await getUserQuery(client);

  if (!data.user) {
    redirect("/login");
  }

  const listItems = await listUserListItemsQuery(
    client,
    data.user.id,
    params.list_uid
  );

  return (
    <React.Fragment>
      {listItems.data?.map((item) => {
        if (!item.items) {
          return null;
        }

        return (
          <Item
            mode="rich"
            url={item.items.url}
            title={item.items.name}
            description={item.items.description}
            ogImage={item.items.og_image}
          />
        );
      })}
    </React.Fragment>
  );
}
